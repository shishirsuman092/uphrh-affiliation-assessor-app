import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { RiDeleteBin6Line } from "react-icons/ri";

import FilteringTable from "../../components/table/FilteringTable";
import { Button } from "../../components";
import Nav from "../../components/Nav";
import { ContextAPI } from "../../utils/ContextAPI";
import * as XLSX from "xlsx";
import { getCookie } from  "../../utils/common";


import {
  filterAssessments,
  filterForms,
  getAssessmentSchedule,
  searchAssessments,
  deleteSchedule,
  getScheduledList,
  sendEmailNotification,
  uploadAssessmentSchedule

} from "../../api";
import {
  setToLocalForage,
  getFromLocalForage,
} from "../../forms";
import BulkUploadScheduleModal from "./BulkUploadScheduleModal";
import AlertModal from "../../components/AlertModal";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { formatDate, readableDate } from "../../utils";

const ScheduleManagementList = () => {
  let today = `${new Date().getFullYear()}-${new Date().getMonth() + 1
    }-${new Date().getDate()}`;
  const navigation = useNavigate();
  const { setSpinner, setToast, toast } = useContext(ContextAPI);
  var resUserData = [];
  const [assessmentScheduleList, setAssessmentScheduleList] = useState();
  const [scheduleTableList, setScheduleTableList] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    offsetNo: 0,
    limit: 10,
    totalCount: 0,
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bulkUploadScheduleModal, setBulkUploadSchduleModal] = useState(false);
  let [scheduledList, setScheduledList] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const [state, setState] = useState({
    menu_selected: "create_new",
    alertContent: {
      alertTitle: "",
      alertMsg: "",
      actionButtonLabel: "",
    },
  });

  const hiddenFileInput = React.useRef(null);

  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState({});
  const [jsonData, setJsonData] = useState("");

  const COLUMNS = [
    {
      Header: "District",
      accessor: "district",
    },
    {
      Header: "Parent center code",
      accessor: "parent_code",
    },
    {
      Header: "Child center code",
      accessor: "child_code",
    },
    {
      Header: "Institute name",
      accessor: "institute_name",
    },
    {
      Header: "Assessment date",
      accessor: "assessment_date",
    },
    {
      Header: "Assessor IDs",
      accessor: "assessor_id",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "",
      accessor: "more_actions",
    },
  ];

  const cardArray = [
    {
      value: 0,
      key: "total_pending",
      text: "Total pending",
    },
    {
      value: 0,
      key: "submitted_today",
      text: "Received today",
    },
    {
      value: 0,
      key: "in_progress",
      text: "In progress",
    },
    {
      value: 0,
      key: "reviewed_today",
      text: "Reviewed today",
    },
    {
      value: 0,
      key: "reviewed_in_total",
      text: "Reviewed in total",
    },
  ];

  const setTableData = (e) => {
    return {
      scheduled_application_sno: e?.id,
      district: e?.institute?.district,
      child_code: e?.Applicant_form?.child_code || "-",
      parent_code: e?.institute?.parent_code || "-",
      institute_name: e?.institute?.name,
      type: e?.type || "-",
      assessment_date: readableDate(e?.date),
      assessor_id: e?.assessor_code,
      status: e?.status,
      more_actions:
        new Date(
          new Date(e?.date).getFullYear(),
          new Date(e?.date).getMonth(),
          new Date(e?.date).getDate()
        ) <= new Date(today) ? (
          ""
        ) : (
          <div className="flex flex-row text-2xl font-semibold">
            <Menu placement="bottom-end">
              <MenuHandler>
                <button className="leading-3 relative top-[-8px]">...</button>
              </MenuHandler>
              <MenuList className="p-2">
                <MenuItem
                  onClick={() => {
                    setShowAlert(true);
                    setState((prevState) => ({
                      ...prevState,
                      alertContent: {
                        alertTitle: "Delete schedule",
                        alertMsg:
                          "Are you sure,you want to delete this schedule?",
                        actionButtonLabel: "Delete",
                        actionFunction: handleDeleteSchedule,
                        actionProps: [e],
                      },
                    }));
                  }}
                >
                  <div className="flex flex-row gap-4">
                    <div>
                      <RiDeleteBin6Line />
                    </div>
                    <div className="text-semibold">
                      <span>Delete</span>
                    </div>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ),
    };
  };

  const handleDeleteSchedule = async (assessment) => {
    // console.log("clicked", assessment[0]?.id);
    // console.log("clicked2", assessment);

    const postData = { id: assessment[0]?.id };

    try {
      setSpinner(true);
      const response = await deleteSchedule(postData);
      if (response.status === 200) {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "Schedule successfully Deleted!",
          toastType: "success",
        }));
        //email notification
        const emailData = {
          recipientEmail: [`${assessment[0]?.assessor?.email}`],
          emailSubject: `Inspection Scheduled for ${assessment[0]?.institute?.name} Cancelled!`,
          emailBody: `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Your Email Title</title><link href='https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&display=swap' rel='stylesheet'></head><body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'><table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 20px; text-align: center; background-color: #F5F5F5;'><img src='https://regulator.upsmfac.org/images/upsmf.png' alt='Logo' style='max-width: 360px;'></td></tr></table><table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 36px;'><p style='color: #555555; font-size: 18px; font-family: 'Mulish', Arial, sans-serif;'>Dear ${assessment[0]?.assessor?.name
            },</p><p style='color: #555555; font-size: 18px; line-height: 1.6; font-family: 'Mulish', Arial, sans-serif;'>
          This is to inform you that the inspection scheduled for ${assessment[0]?.institute?.name
            } on ${readableDate(
              assessment[0]?.date
            )} is cancelled. We will keep you posted for the upcoming inspections.
          </p></td></tr></table></body></html>`,
        };
        // sendEmailNotification(emailData);

        fetchAllAssessmentSchedule();
      }
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while deleting form!",
        toastType: "error",
      }));
    } finally {
      setSpinner(false);
    }
    setShowAlert(false);
  };

  const filterApiCall = async (filters) => {
    const postData = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      ...filters,
    };
    try {
      setSpinner(true);
      const res = await filterAssessments(postData);
      setAssessmentScheduleList(res?.data?.assessment_schedule);
      const data = res?.data?.assessment_schedule;
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res.data.assessment_schedule_aggregate.aggregate.totalCount,
      }));
      setScheduleTableList(data.map(setTableData));
    } catch (error) {
      console.log("error - ", error);
    } finally {
      setSpinner(false);
    }
  };

  const searchApiCall = async (searchData) => {
    const postData = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      ...searchData,
    };
    try {
      setSpinner(true);
      const res = await searchAssessments(postData);
      setAssessmentScheduleList(res?.data?.assessment_schedule);
      const data = res?.data?.assessment_schedule;
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res.data.assessment_schedule_aggregate.aggregate.totalCount,
      }));
      setScheduleTableList(data.map(setTableData));
    } catch (error) {
      console.log("error - ", error);
    } finally {
      setSpinner(false);
    }
  };

  const fetchAllAssessmentSchedule = async () => {
    const pagination = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
    };
    try {
      setSpinner(true);
      const res = await getAssessmentSchedule(pagination);
      setAssessmentScheduleList(res?.data?.assessment_schedule);
      const data = res?.data?.assessment_schedule;
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res.data.assessment_schedule_aggregate.aggregate.totalCount,
      }));
      setScheduleTableList(data.map(setTableData));
    } catch (error) {
      console.log("error - ", error);
    } finally {
      setSpinner(false);
    }
  };

  const fetchAllScheduledList = async () => {
    const items = await getFromLocalForage("scheduleList");
    if (items && Object.values(items).length) return;

    const postData = {
      today: new Date().toJSON().slice(0, 10),
    };

    const res = await getScheduledList(postData);
    if (res?.data?.assessment_schedule?.length) {
      setScheduledList(res?.data?.assessment_schedule);
      setToLocalForage("scheduleList", res?.data?.assessment_schedule);
    }
  };


  const handleFileInputChange = (e) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded)
    if (!fileUploaded?.name?.includes(".xls") || fileUploaded?.size > 2000000) {
      setFileTypeError(true);
    } else {
      setFileName(
        fileUploaded.name.substring(0, fileUploaded.name.lastIndexOf("."))
      );
      setFileTypeError(false);
      setFile(fileUploaded);
     // showFileDataInTable(fileUploaded)
    // handleFileUploadSubmit();
    }
  };

  

  const showFileDataInTable = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(JSON.stringify(json, null, 2));
      };
      reader.readAsBinaryString(file);
      console.log(jsonData)
    }
  
  };

  const handleFileInputClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleFileUploadSubmit = () => {
    if(file){
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", getCookie("userData")?.id);
     console.log(formData)
      submitAssessmentSchedule(formData);
    }
  };

  const submitAssessmentSchedule = async (postData) => {
    let res = {};
    try {
      setSpinner(true);
      res = await uploadAssessmentSchedule(postData);
   
    } catch (error) {
      console.log("error - ", error);
    } finally {
      setSpinner(false);
      //setFile({});
      setFileName("");
     
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: res.status === 200 ? "Schedule uploaded successfully! Please check your email after some time." : "Failed to upload schedule !!",
        toastType: res.status === 200 ? "success" : "error"
      }));

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    
    }
  };

  useEffect(() => {
    if (!isSearchOpen && !isFilterOpen) {
      fetchAllAssessmentSchedule();
    }
  }, [paginationInfo.offsetNo, paginationInfo.limit]);

  useEffect(() => {
    fetchAllScheduledList();
  }, []);

  useEffect(() => {
    //console.log(jsonData)
  }, [jsonData]);

  useEffect(() => {
    //console.log(jsonData)
    if(fileName === ""){
      setFile()
    }
  }, [fileName]);
  

  return (
    <>
      {showAlert && (
        <AlertModal showAlert={setShowAlert} {...state.alertContent} />
      )}
      <Nav />

      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>

        <hr />
        <div className=" sm:col-span-3 flex justify-end">
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ref={hiddenFileInput}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />

          <Button
            moreClass="m-4 text-white flex justify-center h-fit w-[300px] px-6"
            text="Upload schedule ( xls files < 2MB ) "
            onClick={handleFileInputClick}
          />{" "}
          {fileTypeError && (
            <div className="text-red-500">
              {"Only xls files accepted!(max size 2MB)"}
            </div>
          )}
        </div>

        <div className="flex justify-end ml-4">{fileName}</div>

        <div className="footer flex flex-row justify-end ">
          <button
               onClick={() => {
                setFileName("");    window.location.reload();
              }} 
            className="border border-blue-900 bg-white text-blue-900 w-[140px] h-[40px] font-medium rounded-[4px] m-3"
          >
            Cancel
          </button>
          <button
            onClick={() => handleFileUploadSubmit()}
            disabled={fileName && !fileTypeError ? false : true}
            // className="border border-blue-900 text-white bg-blue-900 w-[140px] h-[40px] font-medium rounded-[4px]"
            className={`${fileName && !fileTypeError
                ? "border border-blue-900 text-white bg-blue-900 w-[140px] h-[40px] m-3 font-medium rounded-[4px]"
                : "cursor-not-allowed border border-gray-500 bg-white text-gray-500 px-8 h-[44px] m-3"
              }`}
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row">
              <div className="flex flex-grow items-center">
                {/* <div className="text-xl font-semibold">Schedule Management</div> */}

              </div>
              <div className="flex flex-grow justify-end">
                {/* <span className="flex gap-4">
                  <Button
                    onClick={() => setBulkUploadSchduleModal(true)}
                    moreClass="text-white"
                    text="Upload CSV for scheduling"
                  ></Button>
                </span> */}
              </div>
            </div>
            {/* <div className="flex flex-wrap">
              {cardArray.map((obj, index) => (
                <Card
                  moreClass="shadow-md w-[200px] h-[100px] m-3 first:ml-0"
                  key={index}
                >
                  <div className="flex flex-col place-items-start justify-center gap-2">
                    <h3 className="text-xl font-semibold">{obj.value}</h3>
                    <div className="text-sm font-medium text-gray-700">
                      {obj.text}
                    </div>
                  </div>
                </Card>
              ))}
            </div> */}
          </div>
          <div className="flex flex-col gap-4">
            <FilteringTable
              dataList={scheduleTableList}
              columns={COLUMNS}
              navigateFunc={() => { }}
              filterApiCall={filterApiCall}
              onRowSelect={() => { }}
              pagination={true}
              showFilter={true}
              showSearch={true}
              paginationInfo={paginationInfo}
              setPaginationInfo={setPaginationInfo}
              setIsSearchOpen={setIsSearchOpen}
              setIsFilterOpen={setIsFilterOpen}
              searchApiCall={searchApiCall}
            />
          </div>
        </div>
      </div>
      {bulkUploadScheduleModal && (
        <BulkUploadScheduleModal
          setBulkUploadSchduleModal={setBulkUploadSchduleModal}
          fetchAllAssessmentSchedule={fetchAllAssessmentSchedule}
        />
      )}
    </>
  );
};

export default ScheduleManagementList;

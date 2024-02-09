import API_URL from "./apiUrl";
import adminCustomPost from "./adminCustomApi";
import fileConversionCustomPost from "./fileConversionCustomApi";
import fileUploadAdminCustomApi from "./fileUploadAdminCustomApi";
import axios from "axios";
import { getCookie } from "../utils/common";
import { utils, writeFile } from 'xlsx';

const BASE_URL_KEYCLOAK =
  process.env.REACT_APP_WEB_PORTAL_USER_SERVICE_URL ||
  "https://auth.upsmfac.org/api/v1/";
const NOTIFICATION_BASE_URL =
  process.env.REACT_APP_NODE_URL || "https://uphrh.in/api/api/";

export const registerUser = async (postData) => {
  const res = await adminCustomPost.post(API_URL.auth.register, postData);
  return res;
};

export const getRegulator = async (postData) => {
  const res = await adminCustomPost.post(API_URL.auth.getRegulator, postData);
  return res;
};

export const getFormData = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.groundAnalysis.viewForm,
    postData
  );
  return res;
};

export const getOnGroundAssessorData = async (postData) => {
  const res = await adminCustomPost.post(API_URL.groundAnalysis.list, postData);
  return res;
};

export const fetchOGAFormsList = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.groundAnalysis.OGAFormsList,
    postData
  );
  return res;
};

export const getOGAFormsCount = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.groundAnalysis.OGAFormsCount,
    postData
  );
  return res;
};



export const getAcceptApplicantNoc = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.groundAnalysis.acceptApplicantNoc,
    postData
  );
  return res;
};

export const getAcceptApplicantCertificate = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.groundAnalysis.acceptApplicantCertificate,
    postData
  );
  return res;
};

export const getRejectApplicant = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.groundAnalysis.rejectApplicant,
    postData
  );
  return res;
};

export const getStatus = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.viewStatus.getViewStatus,
    postData
  );
  return res.data;
};

export const markReviewStatus = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.groundAnalysis.markStatus,
    postData
  );
  return res;
};

export const filterOGA = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.groundAnalysis.filterOGA,
    postData
  );
  return res;
};

// Manage forms APIs
export const convertODKtoXML = async (postData) => {
  const res = await fileConversionCustomPost.post(
    API_URL.manageForms.convertODKtoXML,
    postData
  );
  return res;
};

export const nocPdfUploader = async (postData) => {
  const res = await fileConversionCustomPost.post(
    API_URL.manageForms.nocPdfUpload,
    postData
  );
  return res;
};

export const createForm = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.createForm,
    postData
  );
  return res;
};

export const findFormsWithSameName = async (postData) => {
  return await adminCustomPost.post(
    API_URL.manageForms.findForms,
    postData
  );
};

export const fetchAllComments = async (postData) => {
/*   const res = await adminCustomPost.post(
    API_URL.manageForms.getForms,
    postData
  ); */
  const res = {
    "commentTree": {
        "commentTreeId": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6InNjaGVtZTEiLCJlbnRpdHlUeXBlIjoic2NoZW1lIiwid29ya2Zsb3ciOiJhcHByb3ZhbCJ9.UOm0cKp_ip2aUQLw3ghbo2TYUKPhQn9jq4ESDumFe4M",
        "commentTreeData": {
            "comments": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "children": [
                                                {
                                                    "commentId": "2fbb3951-520f-11ee-99d1-818943f8dcc5"
                                                }
                                            ],
                                            "commentId": "a57c0f00-520c-11ee-99d1-3bfe88a8da12"
                                        }
                                    ],
                                    "commentId": "c14e81ae-5138-11ee-99d1-2fc242988c1f"
                                },
                                {
                                    "commentId": "4b2de04f-515d-11ee-99d1-33ae7dd92a08"
                                },
                                {
                                    "commentId": "0a254994-52e8-11ee-99d1-470c82849d58"
                                }
                            ],
                            "commentId": "86a475cb-5073-11ee-99d1-9b5e78640948"
                        },
                        {
                            "commentId": "acc61f1c-512c-11ee-99d1-d3199133ca7b"
                        },
                        {
                            "commentId": "6be51e9d-5138-11ee-99d1-19fbc8a13401"
                        },
                        {
                            "commentId": "62b34c92-52e5-11ee-99d1-63bfaeddbcb5"
                        },
                        {
                            "commentId": "c4763cb3-52e7-11ee-99d1-5d367925f667"
                        }
                    ],
                    "commentId": "cef4c929-506d-11ee-99d1-1b6e163ce3cf"
                },
                {
                    "commentId": "dff72fba-506d-11ee-99d1-d39327540958"
                }
            ],
            "entityId": "scheme1",
            "workflow": "approval",
            "childNodes": [
                "cef4c929-506d-11ee-99d1-1b6e163ce3cf",
                "dff72fba-506d-11ee-99d1-d39327540958",
                "86a475cb-5073-11ee-99d1-9b5e78640948",
                "acc61f1c-512c-11ee-99d1-d3199133ca7b",
                "6be51e9d-5138-11ee-99d1-19fbc8a13401",
                "c14e81ae-5138-11ee-99d1-2fc242988c1f",
                "4b2de04f-515d-11ee-99d1-33ae7dd92a08",
                "a57c0f00-520c-11ee-99d1-3bfe88a8da12",
                "2fbb3951-520f-11ee-99d1-818943f8dcc5",
                "62b34c92-52e5-11ee-99d1-63bfaeddbcb5",
                "c4763cb3-52e7-11ee-99d1-5d367925f667",
                "0a254994-52e8-11ee-99d1-470c82849d58"
            ],
            "entityType": "scheme",
            "firstLevelNodes": [
                "cef4c929-506d-11ee-99d1-1b6e163ce3cf",
                "dff72fba-506d-11ee-99d1-d39327540958"
            ]
        },
        "status": "active",
        "createdDate": "2023-09-11T06:38:25.036+00:00",
        "lastUpdatedDate": null
    },
    "comments": [
      
     
        {
            "commentId": "c14e81ae-5138-11ee-99d1-2fc242988c1f",
            "commentData": {
                "file": "file123",
                "comment": "Please agree both of u...",
                "commentSource": {
                  "userId": "vid666",
                  "userPic": "vidPic",
                  "userName": "vidya Patel",
                  "role":"Admin"
                }
            },
            "status": "active",
            "createdDate": "2023-09-12T06:51:09.823+00:00",
            "lastUpdatedDate": null
        },
        {
            "commentId": "c4763cb3-52e7-11ee-99d1-5d367925f667",
            "commentData": {
                "file": "file123",
                "comment": "Noooooooooooooooooooooooo",
                "commentSource": {
                  "userId": "dev233",
                  "userPic": "devPic",
                  "userName": "dev nair",
                  "role":"Desktop-Admin"
                }
            },
            "status": "active",
            "createdDate": "2023-09-14T10:16:28.207+00:00",
            "lastUpdatedDate": null
        },
        {
            "commentId": "cef4c929-506d-11ee-99d1-1b6e163ce3cf",
            "commentData": {
                "file": "file123",
                "comment": "Ok .. close it then..",
                "commentSource": {
                    "userId": "rahul123",
                    "userPic": "rahulPic",
                    "userName": "rahul pawar",
                    "role":"Assessor"
                }
            },
            "status": "active",
            "createdDate": "2023-09-11T06:38:24.882+00:00",
            "lastUpdatedDate": null
        }
    ],
    "commentCount": 10
}
  return res;
};


export const getForms = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.getForms,
    postData
  );
  return res;
};

export const publishForms = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.manageForms.publishForms,
    postData
  );
  return res;
};

export const unpublishForms = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.manageForms.unpublishForms,
    postData
  );
};

export const viewForm = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.viewForm,
    postData
  );
  return res;
};

export const duplicateForms = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.duplicateForm,
    postData
  );
  return res;
};

export const deleteForm = async (postData) => {
  return await adminCustomPost.delete(API_URL.manageForms.deleteForm, {
    data: postData,
  });
};

export const filterForms = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.filterForms,
    postData
  );
  return res;
};

export const createCourse = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.createCourses,
    postData
  );
  return res;
};

export const updateForms = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.updateForms,
    postData
  );
  return res;
};

// Manage users API's...
export const getAllAssessors = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.getAllAssessors,
    postData
  );
  return res;
};

export const getAllRegulators = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.getAllRegulators,
    postData
  );
  return res;
};

export const fetchAllDeskTopAssessors = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.getRegulatorsByRole,
    postData
  );
  return res;
};

export const fetchAllInstitutes = async (postData) => {
  return await adminCustomPost.post(
    API_URL.manageUsers.getAllInstitutes,
    postData
  );
};


export const getUsersForScheduling = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.desktopAnalysis.getUsersForSchedulingAssessment,
    postData
  );
  return res;
};
export const handleActiveUser = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.manageUsers.setActivate,
    postData
  );
  return res;
};

export const handleActiveRegulatorUser = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.manageUsers.setRegulatorActive,
    postData
  );
  return res;
};

export const handleDeleteUser = async (postData) => {
  return await adminCustomPost.delete(API_URL.manageUsers.deleteUser, {
    data: postData,
  });
};

export const handleInctiveUser = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.manageUsers.setDeactive,
    postData
  );
  return res;
};

export const handleInctiveRegulatorUser = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.manageUsers.setRegulatorDeactive,
    postData
  );
  return res;
};

export const getSpecificUser = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.specificUser,
    postData
  );
  return res;
};

export const filterUsers = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.filterUsers,
    postData
  );
  return res;
};

export const editUserHasura = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.editUser,
    postData
  );
  return res;
};

// Desktop Analysis APIs...
export const getScheduleAssessment = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.desktopAnalysis.scheduleAssessment,
    postData
  );
  return res;
};
export const addInstituteCourse = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.desktopAnalysis.addInstituteCourse,
    postData
  );
  return res;
};

export const getAssessorFormData = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.desktopAnalysis.getOGAFormDetails,
    postData
  );
  return res;
}
export const getDesktopAnalysisForms = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.desktopAnalysis.getDesktopAnalysisForms,
    postData
  );
  return res;
};

export const getAllTheCourses = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.desktopAnalysis.getCourseOGA,
    postData
  );
  return res;
};


export const filterDesktopAnalysis = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.desktopAnalysis.filterDesktopAnalysis,
    postData
  );
  return res;
};

//Certificate Management API...
export const getNOCCertificate = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.certificateManagement.getNOCCertificate,
    postData
  );
  return res;
};

// Schedule Management APIs...
export const getAssessmentSchedule = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.scheduleManagement.getAssessmentSchedule,
    postData
  );
  return res;
};

export const filterAssessments = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.scheduleManagement.filterAssessments,
    postData
  );
  return res;
};

export const addAssessmentSchedule = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.scheduleManagement.addAssessmentSchedule,
    postData
  );
  return res;
};

export const deleteSchedule = async (postData) => {
  return await adminCustomPost.delete(
    API_URL.scheduleManagement.deleteSchedule,
    {
      data: postData,
    }
  );
};

export const getScheduledList = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.scheduleManagement.getAllSchedule,
    postData
  );
  return res;
};

export const uploadAssessmentSchedule = async (postData) => {
  const res = await fileUploadAdminCustomApi.post(
    API_URL.scheduleManagement.uploadAssessmentSchedule,
    postData,
  );
  return res;
};

// Bulk create users keycloak
export const createBulkUsersKeyCloak = async (postData) => {
  return await axios.post(
    `${BASE_URL_KEYCLOAK}${API_URL.SIGNUP.CREATE_USER}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": getCookie("access_token")
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
    }
  );
};

export const checkIsEmailExist = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.SIGNUP.CHECK_IS_EMAIL_EXIST,
    postData
  );
  return res;
};

// Edit user keycloak
export const editUserKeycloak = async (postData) => {
  const res = await axios.put(
    `${BASE_URL_KEYCLOAK}${API_URL.SIGNUP.EDIT_USER}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": getCookie("access_token")
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
    }
  );
  return res;
};

// Bulk create users 

export const createBulkUsers = async (postData) => {
  return await axios.post(
    `${BASE_URL_KEYCLOAK}${API_URL.USER.CREATE_BULK}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": getCookie("access_token")
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
    }
  );
};

export const createBulkUserHasura = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.addUsers,
    postData
  );
  return res;
};

export const getScheduleDetails = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageUsers.viewSchedule,
    postData
  );
  return res;
};

// delete users
// export const deleteUsers = async (postData) => {
//   const res = await adminCustomPost.post(
//     API_URL.manageUsers.addUsers,
//     postData
//   );
//   return res;
// };

//global search
export const searchUsers = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.GLOBAL_SEARCH.searchUsers,
    postData
  );
  return res;
};

export const searchDesktop = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.GLOBAL_SEARCH.searchDesktop,
    postData
  );
  return res;
};

export const searchOGA = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.GLOBAL_SEARCH.searchOGA,
    postData
  );
  return res;
};

export const searchForms = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.GLOBAL_SEARCH.searchForms,
    postData
  );
  return res;
};

export const searchAssessments = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.GLOBAL_SEARCH.searchAssessments,
    postData
  );
  return res;
};

export const searchNOC = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.GLOBAL_SEARCH.searchNOC,
    postData
  );
  return res;
};

export const registerEvent = async (postData) => {
  const events = {
    events: [],
  };
  events.events.push(postData);
  // console.log("events - ", events);

  const res = await adminCustomPost.post(API_URL.common.registerEvent, events);
  return res;
};

//Notifications APIs updated
export const getAllNotifications = async (postData) => {
  const res = await adminCustomPost.post(
    `${API_URL.notifications.getAllNotifications}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": getCookie("access_token")
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
    }
  );
  return res;
};

export const readNotification = async (postData) => {
  const res = await adminCustomPost.post(
    `${API_URL.notifications.readNotification}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": getCookie("access_token")
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
    }
  );
  return res;
};

export const sendPushNotification = async (postData) => {
  const res = await adminCustomPost.post(
    `${API_URL.notifications.sendPushNotification}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": getCookie("access_token")
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
    }
  );
  return res;
};

export const sendEmailNotification = async (postData) => {
  const res = await adminCustomPost.post(
    `${API_URL.notifications.emailNotify}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": getCookie("access_token")
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
    }
  );
  return res;
};

export const getAllRegulatorDeviceId = async () => {
  const res = await adminCustomPost.get(
    API_URL.notifications.getAllRegulatorDeviceId
  );
  return res;
};

export const getApplicantDeviceId = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.notifications.getApplicantDeviceId,
    postData
  );
  return res;
};

//Dashboard apis


export const searchDashBoard = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.dashboard.search,
    postData
  );
  return res;
};

export const filterDashBoardData = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.dashboard.filter,
    postData
  );
  return res;
};

export const getInProgressCount = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.dashboard.progresscount,
    postData
  );
  return res;
};

export const getApprovedCount = async (postData) => {
  console.log(postData)
  const res = await adminCustomPost.post(
    API_URL.dashboard.approvedcount,
    postData
  );
  return res;
};

export const getRejectedCount = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.dashboard.rejectedcount,
    postData
  );
  return res;
};




//other common APIs
export const updateFormStatus = async (postData) => {
  const res = await adminCustomPost.put(API_URL.common.updateForm, postData);
  return res;
};

export const updateFormStatusForOGA = async (postData) => {
  const res = await adminCustomPost.put(API_URL.common.updateFormStatusForOGA, postData);
  return res;
};

export const updatePaymentStatus = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.desktopAnalysis.updatePaymentStatus,
    postData
  );
  return res;
};

export const updateRegulatorDeviceId = async (postData) => {
  const res = await adminCustomPost.put(
    API_URL.common.updateRegulatorDeviceId,
    postData
  );
  return res;
};

export const getTransactionDetail = async (postData) => {
  const res = await adminCustomPost.get(
    API_URL.desktopAnalysis.getTransactionDetail + "/" + postData
  );
  return res;
};

/* returns course mapping based on course type and course level */
export const getCoursesByTypeAndLevel = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageForms.getCourses,
    postData
  )
  return res;
}


//#region (roles apis)

export const fetchAllUserRoles = async (postData) => {
  return await adminCustomPost.post(
    API_URL.manageRoles.getAll,
    postData
  )
}

export const getSpecificRoleByRoleId = async (postData) => {
  return await adminCustomPost.post(
    API_URL.manageRoles.getRoleById,
    postData
  )
}

export const editRole = async (postData) => {
  return await adminCustomPost.post(
    API_URL.manageRoles.editRole,
    postData
  )
}

export const createRole = async (postData) => {
  return await adminCustomPost.put(
    API_URL.manageRoles.addRole,
    postData
  )
}

export const updateRoleById = async (postData) => {
  const res = await adminCustomPost.post(
    API_URL.manageRoles.toggleRoleStatus,
    postData
  );
  return res;
};





//#region (roles apis)



//#region (xlsx)

//#region (json to xlsx)
export const exportToExcel = async (downloadObjects) => {
  if (downloadObjects && downloadObjects.objectsList) {
    const workbook = utils.book_new();
    let wscols = [
      {wch:10},
      {wch:20},
      {wch:20},
      {wch:20},
      {wch:25},
      {wch:20},
      {wch:10}
  ];
  
    downloadObjects.objectsList.forEach((element) => {
      const sheetName = element.sheetName ? element.sheetName : `Sheet ${workbook.SheetNames.length + 1}`
      const worksheet = utils.json_to_sheet([]);
      worksheet['!cols'] = wscols;
      utils.sheet_add_aoa(worksheet, [element.headers])
      utils.book_append_sheet(workbook, worksheet, sheetName);
      utils.sheet_add_json(worksheet, element.downloadObject, { origin: 'A4', skipHeader: true });
    });
    writeFile(workbook, downloadObjects.fileName ? downloadObjects.fileName : 'data.xlsx');
    //writeFile(workbook, 'NoteExport.xls', { bookType: 'xlsx', type: 'buffer' });
  }
}

//download pdf
export const base64ToPdf = async (postData) => {
  const res = await axios.post(`${process.env.REACT_APP_PDF_DOWNLOAD_URL}/convert-via-puppeteer/pdfpuppeteer`, {
    url: postData,
  });
  return res;
};
//#endregion

//#endregion

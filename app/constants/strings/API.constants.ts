export const API = {
  METHODS: {
    POST: "POST",
    GET: "GET",
    PATCH: "PATCH",
    DELETE: "DELETE",
  },
  ROUTES: {
    USERS: "/api/users",
    REGISTER: "/api/register",
    LOGIN: "/api/login",
    LOGIN_ATTEMPT: "/api/login/attempt",
    ADMIN_LOGIN: "/api/admin/login",
    SESSION_VERIFY: "/api/session/verify",
    HEADQUARTERS_GET_DOCTOR:
      "/api/headquarters/get-doctors",
    HEADQUARTERS_ADD: "/api/headquarters/add",
    HEADQUARTERS_CHECK_EMAIL:
      "/api/headquarters/check-email",
    HEADQUARTERS_UPLOAD_IMAGE:
      "/api/headquarters/upload-image",
    HEADQUARTERS_DELETE_IMAGE:
      "/api/headquarters/delete-image",
    HEADQUARTERS: "/api/headquarters",
    HEADQUARTERS_PAGE_MAP: "/api/headquarters/page-map",
    PLAN_CONTRACT: "/api/plan-contract",
    PLAN_CONTRACT_CANCEL: "/api/plan-contract/cancel",
    DOCTORS: "/api/doctors",
    SEND: "/api/send",
    SEND_PRICE_CHANGE: "/api/send/price-change",
    USERS_CHANGE_DATA: "/api/users/change-data",
    DOCTORS_SPECIALTIES: "/api/doctors/specialties",
    DOCTORS_CHANGE_DATA: "/api/doctors/change-data",
    DOCTORS_SPECIALTIES_ADD: "/api/doctors/specialties/add",
    DOCTORS_ADD: "/api/doctors/add",
    MEDICATIONS: "/api/medications",
    MEDICATIONS_ADD: "/api/medications/add",
    MEDICATIONS_CHANGE_DATA: "/api/medications/change-data",
    MEDICATIONS_DELETE: "/api/medications/delete",
    MEDICATIONS_PAGE_MAP: "/api/medications/page-map",
    PATIENTS: "/api/patients",
    PATIENTS_DOCTORS: "/api/patients/doctors",
    PATIENTS_ADD: "/api/patients/add",
    PATIENTS_CHANGE_DATA: "/api/patients/change-data",
    PATIENTS_LOG: "/api/patients/log",
    PATIENTS_PAGE_MAP: "/api/patients/page-map",
    PATIENTS_LOG_PAGE_MAP: "/api/patients/log/page-map",
    PATIENTS_LOG_DOWNLOAD: "/api/patients/log/download",
    BUFOST_SERVICES: "/api/bufost-services",
    BUFOST_SERVICES_ADD: "/api/bufost-services/add",
    BUFOST_SERVICES_CHANGE_DATA:
      "/api/bufost-services/change-data",
    BUFOST_SERVICES_DELETE: "/api/bufost-services/delete",
    BUFOST_SERVICES_PAGE_MAP:
      "/api/bufost-services/page-map",
    BUFOST_SERVICES_UPLOAD_ICON:
      "/api/bufost-services/upload-icon",
    BUFOST_SERVICES_DELETE_ICON:
      "/api/bufost-services/delete-icon",
    BUFOST_PLANS: "/api/bufost-plans",
    BUFOST_PLANS_ADD: "/api/bufost-plans/add",
    BUFOST_PLANS_CHANGE_DATA:
      "/api/bufost-plans/change-data",
    BUFOST_PLANS_DELETE: "/api/bufost-plans/delete",
    BUFOST_PLANS_PAGE_MAP: "/api/bufost-plans/page-map",
    BUFOST_PLANS_UPLOAD_ICON:
      "/api/bufost-plans/upload-icon",
    BUFOST_PLANS_DELETE_ICON:
      "/api/bufost-plans/delete-icon",
    BUFOST_PLANS_CHECK_CONTRACTED:
      "/api/bufost-plans/check-contracted",
    CLIENT_ADMINS: "/api/client-admins",
    CLIENT_ADMINS_PAGE_MAP: "/api/client-admins/page-map",
    CLIENT_ADMINS_CHANGE_DATA:
      "/api/client-admins/change-data",
    DOCTORS_DELETE_RECOVER: "/api/doctors/delete-recover",
    DOCTORS_PAGE_MAP: "/api/doctors/page-map",
    INVITE: "/api/invite",
  },
  HEADERS: {
    JSON: "application/json",
    CONTENT_TYPE: "Content-Type",
    CONTENT_DISPOSITION: "Content-Disposition",
  },
};

export type String = (typeof API)[keyof typeof API];

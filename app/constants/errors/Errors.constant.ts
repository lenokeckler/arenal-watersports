export const ERRORS = {
  COMMON: {
    REQUIRED_FIELD: "Some required fields are missing",
    UNAUTHORIZED: "User not authorized",
    INVALID_STATE: "State must be 0 or 1",
    UNKNOWN: "Unknown error",
    SERVER: "Error retrieving data from server",
    SERVICE_NOT_FOUND: "Service not found",
    USER_NOT_FOUND: "User not found",
    INVALID_REQUEST: "Invalid request parameters",
    OPERATION_FAILED: "Operation failed",
  },
  MISSING_DATA: {
    REQUIRED_DATA: "Missing required data",
    UID_REQUIRED: "User ID is required",
    PLAN_ID_REQUIRED: "Plan ID is required",
    SPECIALTY_REQUIRED: "Specialty is required",
    DOCTOR_ID_REQUIRED: "Doctor ID is required",
    PATIENT_ID_REQUIRED: "Patient ID is required",
    EMAIL_REQUIRED: "Email is required",
    USER_FIELD_REQUIRED: "User field is required",
  },
  INACTIVITY_TIMEOUT: {
    CONTEXT_NOT_FOUND:
      "useInactivityTimeout must be used within an InactivityTimeoutProvider",
  },
  FILE_UPLOAD: {
    NO_FILE: "No file provided",
    NO_SERVICE_NAME: "No service name provided",
    INVALID_FILE_TYPE:
      "Invalid file type. Only images are allowed.",
    FILE_SIZE_EXCEEDED: "File size exceeds 5MB limit",
    UPLOAD_FAILED: "Failed to upload icon",
  },
  EMAIL: {
    NO_CONTRACTS: "No active contracts found for this plan",
    NOTIFICATIONS_SENT: "Notifications sent",
  },
  DATABASE: {
    DOCUMENT_NOT_FOUND: "Document not found",
    QUERY_FAILED: "Database query failed",
    UPDATE_FAILED: "Failed to update document",
    DELETE_FAILED: "Failed to delete document",
    CREATE_FAILED: "Failed to create document",
  },
  PAGINATION: {
    INVALID_PAGE: "Invalid page number",
    INVALID_PAGE_SIZE: "Invalid page size",
    INVALID_CURSOR: "Invalid pagination cursor",
  },
  DOCTORS: {
    NOT_FOUND: "Doctor not found",
    SPECIALTY_NOT_FOUND: "Specialty not found",
    INVALID_DATA: "Invalid doctor data",
  },
  PATIENTS: {
    NOT_FOUND: "Patient not found",
    INVALID_DATA: "Invalid patient data",
    LOG_NOT_FOUND: "Patient log not found",
  },
  PLANS: {
    NOT_FOUND: "Plan not found",
    CONTRACT_NOT_FOUND: "Plan contract not found",
    INVALID_DATA: "Invalid plan data",
  },
  SERVICES: {
    NOT_FOUND: "Service not found",
    INVALID_DATA: "Invalid service data",
  },
  HEADQUARTERS: {
    NOT_FOUND: "Headquarters not found",
    NO_DOCTORS: "No doctors found for this headquarters",
    INVALID_DATA: "Invalid headquarters data",
  },
  ADMINS: {
    NOT_FOUND: "Admin not found",
    INVALID_CREDENTIALS: "Invalid admin credentials",
  },
  INVITES: {
    NOT_FOUND: "Invitation not found",
    ALREADY_USED: "Invitation already used",
    USER_TARGET_NOT_FOUND:
      "Invitation user target not found",
    USER_NOT_FOUND: "Invited user not found",
    USER_EMAIL_NOT_FOUND: "Invited user email not found",
  },
  MEDICATIONS_ERROR: {
    MISSING:
      "Missing required fields: name, description, frequency_use (with days and hours), registration_date, state",
    FETCH_ERROR: "Error fetching medications",
    ADD_ERROR: "Error adding medication",
    UPDATE_ERROR: "Error updating medication",
    DELETE_ERROR: "Error deleting medication",
    ID_NOT_FOUND: "Missing medication ID",
    MEDICATION_NOT_FOUND: "Medication not found",
  },
  INTERNAL_SERVER_ERROR: {
    MESSAGE: "Internal Server Error",
  },
} as const;

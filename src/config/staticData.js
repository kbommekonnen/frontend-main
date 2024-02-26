export const CLASSES = [
  // { name: ' ORGANIZATION', activities: ["0008ut", "0088ut", "0888ut"] },
  { name: "Branch ", activities: ["0006o", "0066o", "0666o"] },
  {
    name: "Payment",
    activities: [
      "0009up",
      "0999up",
      "0333uc",
      "0099up",
      "0003uc",
      "0033uc",
      "212",
      "213",
    ],
  },
  {
    name: "Credential",
    activities: [
      "0444orgc",
      "0444offc",
      "0004c",
      "0044c",
      "0044sc",
      "0044dc",
      "0004rrc",
      "0044rsc",
      "0004lc",
      "0044ulc",
      "0044ac",
      "0044crc",
      "0044coc",
      "0444c",
    ],
  },
  {
    name: "Customer",
    activities: [
      "0111orgc",
      "0111offc",
      "0001uc",
      "0001c",
      "0011c",
      "0011sc",
      "0111sc",
    ],
  },
  {
    name: "Role",
    activities: ["0002r", "0022ar", "0022r", "0222r"],
  },
  {
    name: "Custom Fields Config",
    activities: ["0777cf", "0077cf", "0007cf"],
  },
  {
    name: "API Config",
    activities: ["0777ra", "0077ra", "0007ra"],
  },
  {
    name: "REPORT",
    activities: [
      "",
      "r-myorgcust",
      "r-mybrcust",
      "r-orgcust",
      "r-brcust",
      "r-myorgpymnts",
      "r-mybrpymnts",
      "r-orgpymnts",
      "r-brpymnts",
      "r-myorgbills",
      "r-mybrbills",
      "r-orgbills",
      "r-brbills",
      "r-mo-bank-tr",
      "r-oo-bank-tr",
      "r-mb-bank-tr",
      "r-ob-bank-tr",
      "r-mo-bill-tr",
      "r-oo-bill-tr",
      "r-mb-bill-tr",
      "r-ob-bill-tr",
      "r-officer-tr",
      "r-my-tr",
    ],
  },
]

export const CustomFieldsActivities = [
  {
    name: "view other organization bill custom fields",
    description: "view other organization bill custom fields",
    code: "0777ocf",
    required: [""],
  },
  {
    name: "view custom fields",
    description: "View bill custom fields",
    code: "0777cf",
    required: [""],
  },
  {
    name: "Delete Custom Fields",
    description: "delete bill custom fields",
    code: "0077cf",
    required: ["0777cf"],
  },
  {
    name: "Update Custom Fields",
    description: "update bill custom fields",
    code: "0077cf",
    required: ["0777cf"],
  },
  {
    name: "Add Custom Fields",
    description: "add bill custom fields",
    code: "0007cf",
    required: ["0777cf"],
  },
]

export const OrganizationApiConfig = [
  {
    name: "view other organization api config",
    description: "view other organization api config",
    code: "0777ora",
    required: [""],
  },
  {
    name: "view api config",
    description: "View api config",
    code: "0777ra",
    required: [""],
  },
  {
    name: "Delete api config",
    description: "delete api config",
    code: "0077ra",
    required: ["0777ra"],
  },
  {
    name: "Update api config",
    description: "update api config",
    code: "0077ra",
    required: ["0777ra"],
  },
  {
    name: "Add api config",
    description: "add api config",
    code: "0007ra",
    required: ["0777ra"],
  },
]

export const ReportActivities = [
  {
    name: "Organization's Customers",
    description: "",
    code: "r-myorgcust",
  },
  {
    name: "Branch Customers",
    description: "",
    code: "r-mybrcust",
  },
  {
    name: "Customers by branch",
    description: "",
    code: "r-brcust",
  },
  {
    name: "Customers by organization",
    description: "",
    code: "r-orgcust",
  },
  {
    name: "Customer bills",
    description: "paid, available and all",
    code: "",
  },
  // payments

  {
    name: "Organization Payments report",
    description: "",
    code: "r-myorgpymnts",
  },
  {
    name: "Branch Payments report",
    description: "",
    code: "r-mybrpymnts",
  },
  {
    name: "Payments by organization",
    description: "",
    code: "r-orgpymnts",
  },
  {
    name: "Payments by branch",
    description: "",
    code: "r-brpymnts",
  },
  // bills

  {
    name: "Organization Bills report",
    description: "",
    code: "r-myorgbills",
  },
  {
    name: "Branch Bills report",
    description: "",
    code: "r-mybrbills",
  },
  {
    name: "Bills by organization",
    description: "",
    code: "r-orgbills",
  },
  {
    name: "Bills by branch",
    description: "",
    code: "r-brbills",
  },
  // customer bills
  {
    name: "Penality accrued on payment",
    description: "",
    code: "",
  },
  {
    name: "Penality accrued on organization",
    description: "",
    code: "",
  },
  {
    name: "Penality accrued on branch",
    description: "",
    code: "",
  },
  // bill transactions

  {
    name: "My Organization Bill Trxns report",
    description: "",
    code: "r-mo-bill-tr",
  },
  {
    name: "My Branch Bill Trxns report",
    description: "",
    code: "r-mb-bill-tr",
  },
  {
    name: "Bill Trxns by organization",
    description: "",
    code: "r-oo-bill-tr",
  },
  {
    name: "Bill Trxns by branch",
    description: "",
    code: "r-ob-bill-tr",
  },
  // bank transactions

  {
    name: "My Organization Bank Trxns report",
    description: "",
    code: "r-mo-bank-tr",
  },
  {
    name: "My Branch Bank Trxns report",
    description: "",
    code: "r-mb-bank-tr",
  },
  {
    name: "Bank Trxns by organization",
    description: "",
    code: "r-oo-bank-tr",
  },
  {
    name: "Bank Trxns by branch",
    description: "",
    code: "r-ob-bank-tr",
  },
  // branch bill transactions

  {
    name: "Bill transactions on my organization report",
    description: "",
    code: "r-mo-bank-tr",
  },
  {
    name: "Bill transactions on my branch report",
    description: "",
    code: "r-mb-bank-tr",
  },
  {
    name: "Bill transactions on other organization",
    description: "",
    code: "r-oo-bank-tr",
  },
  {
    name: "Bill transactions on other branch",
    description: "",
    code: "r-ob-bank-tr",
  },
  // officer transactions
  {
    name: "Officer Transactions",
    description: "",
    code: "r-officer-tr",
  },
  {
    name: "My Transactions",
    description: "",
    code: "r-my-tr",
  },
]

export const POST_ACTIVITIES = [
  {
    name: "Add Organization",
    description: "CAN REGISTER NEW  ORGANIZATION",
    code: "0008ut",
    required: ["0008ut"],
  },
  {
    name: "Edit Organization",
    description: "can edit registered organization ",
    code: "0088ut",
    required: ["0088ut"],
  },
  {
    name: "View Organizations",
    description: "can view all registered  organizations",
    code: "0888ut",
  },
  {
    name: "Add Branch",
    description: "can add new branch to his/her  organizations",
    code: "0006o",
    required: ["0666o"],
  },
  {
    name: "Add Organization Branch",
    description: "can add new branch to any organization",
    code: "0006oo",
    required: ["0666o"],
  },
  {
    name: "Edit Branch",
    description: "can edit registered branch of his/her  organizations",
    code: "0066o",
    required: ["0666o"],
  },
  {
    name: "View Branches",
    description: "can view all registered branches of the organization ",
    code: "0666o",
  },
  // payments
  {
    name: "Upload Payment",
    description: "can upload his/her branch customer's payment bill",
    code: "0009up",
    required: ["0999up"],
  },
  {
    name: "View Payments",
    description: "can view uploaded payments of his/her branch",
    code: "0999up",
  },
  {
    name: "View Payment Detail",
    description: "can view detail payment information, Bill detail",
    code: "0333uc",
    required: ["0999up"],
  },
  {
    name: "Edit Payment information",
    description:
      "can edit uploaded payment overall information, due date, payment period & description",
    code: "0099up",
    required: ["0333uc"],
  },
  {
    name: "Add Customer Bill",
    description: "can add new customer bill to uploaded payment",
    code: "0003uc",
    required: ["0333uc"],
  },
  {
    name: "Edit Customer Bill",
    description: "can edit selected customer's bill",
    code: "0033uc",
    required: ["0333uc"],
  },
  {
    name: "Pay Customer Bill",
    description: "can pay selected customer's bill",
    code: "212",
    required: ["0333uc"],
  },
  {
    name: "Delete Customer Bill",
    description: "can delete selected customer's bill",
    code: "213",
    required: ["0333uc"],
  },
  {
    name: "Add Role",
    description: "can create new role",
    code: "0002r",
    required: ["0222r"],
  },
  {
    name: "Add Organizaiton Role",
    description: "can create new role for an organization",
    code: "0002or",
    required: ["0222r"],
  },
  {
    name: "Edit Role",
    description: "can edit registered role information",
    code: "0022r",
    required: ["0222r"],
  },
  {
    name: "View Roles",
    description: "can view roles",
    code: "0222r",
  },
  {
    name: "View Organization Roles",
    description: "can view any organization roles",
    code: "0222or",
  },
  {
    name: "Role Authorization actions",
    description: "can grant and revoke activities",
    code: "0022ar",
    required: ["0222r"],
  },
  {
    name: "Register Credential",
    description: "can create new credential",
    code: "0004c",
  },
  {
    name: "Register Organization Credential",
    description: "can create new credential for an organization",
    code: "0004oc",
  },
  {
    name: "Change Credential Status",
    description: "can change credential's status verify, suspend ....",
    code: "0044sc",
    required: ["0444offc"],
  },
  {
    name: "Delete Pending Credential",
    description: "can delete registered credential but not verified",
    code: "0044dc",
    required: ["0444offc"],
  },
  {
    name: "Request Password Reset",
    description: "can request to reset credentials password",
    code: "0004rrc",
    required: ["0444offc"],
  },
  {
    name: "Reset Password",
    description: "can reset credentials requested password",
    code: "0044rsc",
    required: ["0444offc"],
  },
  {
    name: "Logout Credential",
    description: "can logout already logged in user forcelly",
    code: "0004lc",
    required: ["0444offc"],
  },
  {
    name: "Unlock Credential",
    description: "can unlock locked credential ",
    code: "0044ulc",
    required: ["0444offc"],
  },
  {
    name: "Change Credential Authorized tasks",
    description: "can change credetials authorized tasks ",
    code: "0044ac",
    required: ["0444offc"],
  },
  {
    name: "Change Role",
    description: "can change credetials role to another ",
    code: "0044crc",
    required: ["0444offc"],
  },
  {
    name: "Change Office",
    description: "can change credentials office to another ",
    code: "0044coc",
    required: ["0444offc"],
  },
  {
    name: "View All Credentials",
    description: "can view all registered credentials ",
    code: "0444allc",
  },
  {
    name: "View Organization Credentials",
    description: "can view all registered credentials of his  organization ",
    code: "0444orgc",
  },
  {
    name: "View Office Credentials",
    description: "can view all registered credentials of his offic ",
    code: "0444offc",
  },
  {
    name: "View Organization Customers",
    description: "can view all registered customers of his organization ",
    code: "0111orgc",
  },
  {
    name: "View Office Customers",
    description: "can view all registered customers of his office ",
    code: "0111offc",
  },
  {
    name: "Upload Customer",
    description: "can upload new customers in bulk of his  organization ",
    code: "0001uc",
  },
  {
    name: "Add Customer",
    description: "can register new customer of his  organization ",
    code: "0001c",
  },
  {
    name: "Edit Customer",
    description: "can edit & update registered customer of his  organization ",
    code: "0011c",
  },
  {
    name: "Change Customer status",
    description: "can change registered customer status of his  organization ",
    code: "0011sc",
  },
  {
    name: "Search Customer",
    description: "can search registered customer of his organization ",
    code: "0111sc",
  },
]

export const ALL_ACTIVITIES = [
  ...POST_ACTIVITIES,
  ...CustomFieldsActivities,
  ...OrganizationApiConfig,
  ...ReportActivities,
]

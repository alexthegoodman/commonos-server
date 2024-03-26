export * from "./types/Email";
export * from "./types/Inbox";
export * from "./types/Thread";
export * from "./types/WorkEmailFolder";
export * from "./types/WorkEmailTemplate";

export * from "./mutations/sendWorkEmail";
export * from "./mutations/createInbox";
export * from "./mutations/markAsRead";
export * from "./mutations/createWorkEmailFolder";
export * from "./mutations/createWorkEmailTemplate";
export * from "./mutations/updateWorkEmailTemplate";

export * from "./queries/myInboxEmailThreads";
export * from "./queries/myInboxes";
export * from "./queries/myThreadEmails";
export * from "./queries/inbox";
export * from "./queries/myWorkEmailFolders";
export * from "./queries/myWorkEmailFolderTemplates";

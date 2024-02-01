/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSON";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSON";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSON: any
}

export interface NexusGenObjects {
  Company: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    fields?: NexusGenScalars['JSON'] | null; // JSON
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  CompanySettings: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    fields?: NexusGenScalars['JSON'] | null; // JSON
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Contact: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    fields?: NexusGenScalars['JSON'] | null; // JSON
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  ContactSettings: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    fields?: NexusGenScalars['JSON'] | null; // JSON
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Dashboard: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Document: { // root type
    content?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    html?: string | null; // String
    id?: string | null; // String
    markdown?: string | null; // String
    messages?: NexusGenScalars['JSON'] | null; // JSON
    plaintext?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Drawing: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Feed: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    url?: string | null; // String
  }
  Flow: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    prompt?: string | null; // String
    questionsContext?: NexusGenScalars['JSON'] | null; // JSON
    resultsContext?: NexusGenScalars['JSON'] | null; // JSON
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Funnel: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Link: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    url?: string | null; // String
  }
  Mutation: {};
  Organization: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    name?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Presentation: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PresentationTemplate: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    key?: string | null; // String
    sourceId?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Project: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: {};
  Sheet: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Sound: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Type: { // root type
    code?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    name?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    documentTree?: NexusGenScalars['JSON'] | null; // JSON
    drawingFiles?: NexusGenScalars['JSON'] | null; // JSON
    email?: string | null; // String
    feedTree?: NexusGenScalars['JSON'] | null; // JSON
    frequency?: string | null; // String
    lastTokenReset?: NexusGenScalars['DateTime'] | null; // DateTime
    periodTokenUsage?: number | null; // Int
    presentationFiles?: NexusGenScalars['JSON'] | null; // JSON
    role?: string | null; // String
    sheetFiles?: NexusGenScalars['JSON'] | null; // JSON
    soundFiles?: NexusGenScalars['JSON'] | null; // JSON
    subscription?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    videoFiles?: NexusGenScalars['JSON'] | null; // JSON
  }
  Video: { // root type
    context?: NexusGenScalars['JSON'] | null; // JSON
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Company: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    fields: NexusGenScalars['JSON'] | null; // JSON
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  CompanySettings: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    fields: NexusGenScalars['JSON'] | null; // JSON
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
  }
  Contact: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    fields: NexusGenScalars['JSON'] | null; // JSON
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  ContactSettings: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    fields: NexusGenScalars['JSON'] | null; // JSON
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
  }
  Dashboard: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Document: { // field return type
    content: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    html: string | null; // String
    id: string | null; // String
    markdown: string | null; // String
    messages: NexusGenScalars['JSON'] | null; // JSON
    plaintext: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Drawing: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Feed: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    url: string | null; // String
  }
  Flow: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    prompt: string | null; // String
    questionsContext: NexusGenScalars['JSON'] | null; // JSON
    resultsContext: NexusGenScalars['JSON'] | null; // JSON
    type: NexusGenRootTypes['Type'] | null; // Type
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Funnel: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Link: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    url: string | null; // String
  }
  Mutation: { // field return type
    createCompany: NexusGenRootTypes['Company'] | null; // Company
    createContact: NexusGenRootTypes['Contact'] | null; // Contact
    createFile: string | null; // String
    createFlow: NexusGenRootTypes['Flow'] | null; // Flow
    createOrganization: NexusGenRootTypes['Organization'] | null; // Organization
    createProject: NexusGenRootTypes['Project'] | null; // Project
    deleteCompany: string | null; // String
    deleteContact: string | null; // String
    deleteDocument: string | null; // String
    export: string | null; // String
    generateTitles: Array<NexusGenRootTypes['Document'] | null> | null; // [Document]
    newCheckout: string | null; // String
    newDocument: NexusGenRootTypes['Document'] | null; // Document
    newDrawing: NexusGenRootTypes['Drawing'] | null; // Drawing
    newFeed: NexusGenRootTypes['Feed'] | null; // Feed
    newPresentation: NexusGenRootTypes['Presentation'] | null; // Presentation
    newPresentationTemplate: NexusGenRootTypes['PresentationTemplate'] | null; // PresentationTemplate
    newSheet: NexusGenRootTypes['Sheet'] | null; // Sheet
    newSound: NexusGenRootTypes['Sound'] | null; // Sound
    newVideo: NexusGenRootTypes['Video'] | null; // Video
    putCompanySettings: string | null; // String
    putContactSettings: string | null; // String
    registerUser: string; // String!
    simpleUpload: NexusGenScalars['JSON'] | null; // JSON
    updateCompany: NexusGenRootTypes['Company'] | null; // Company
    updateContact: NexusGenRootTypes['Contact'] | null; // Contact
    updateDocument: NexusGenRootTypes['Document'] | null; // Document
    updateDrawing: NexusGenRootTypes['Drawing'] | null; // Drawing
    updateFlow: NexusGenRootTypes['Flow'] | null; // Flow
    updatePresentation: NexusGenRootTypes['Presentation'] | null; // Presentation
    updatePresentationTemplate: NexusGenRootTypes['PresentationTemplate'] | null; // PresentationTemplate
    updateSheet: NexusGenRootTypes['Sheet'] | null; // Sheet
    updateSound: NexusGenRootTypes['Sound'] | null; // Sound
    updateUser: NexusGenRootTypes['User'] | null; // User
    updateVideo: NexusGenRootTypes['Video'] | null; // Video
  }
  Organization: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    name: string | null; // String
    owner: NexusGenRootTypes['User'] | null; // User
    projects: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Presentation: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PresentationTemplate: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    key: string | null; // String
    sourceId: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Project: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    organization: NexusGenRootTypes['Organization'] | null; // Organization
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: { // field return type
    authenticate: string | null; // String
    company: NexusGenRootTypes['Company'] | null; // Company
    contact: NexusGenRootTypes['Contact'] | null; // Contact
    countCompanies: number | null; // Int
    countContacts: number | null; // Int
    document: NexusGenRootTypes['Document'] | null; // Document
    drawing: NexusGenRootTypes['Drawing'] | null; // Drawing
    flow: NexusGenRootTypes['Flow'] | null; // Flow
    getCurrentUser: NexusGenRootTypes['User'] | null; // User
    getFileList: NexusGenScalars['JSON'] | null; // JSON
    getGeneratedText: string | null; // String
    getGuideQuestions: NexusGenScalars['JSON'] | null; // JSON
    getPortalUrl: string | null; // String
    getQuestions: NexusGenScalars['JSON'] | null; // JSON
    getRSSData: Array<NexusGenScalars['JSON'] | null> | null; // [JSON]
    getRevisedContent: NexusGenScalars['JSON'] | null; // JSON
    myCompanies: Array<NexusGenRootTypes['Company'] | null> | null; // [Company]
    myCompanySettings: NexusGenRootTypes['CompanySettings'] | null; // CompanySettings
    myContactSettings: NexusGenRootTypes['ContactSettings'] | null; // ContactSettings
    myContacts: Array<NexusGenRootTypes['Contact'] | null> | null; // [Contact]
    myDashboards: Array<NexusGenRootTypes['Dashboard'] | null> | null; // [Dashboard]
    myDocuments: Array<NexusGenRootTypes['Document'] | null> | null; // [Document]
    myDrawings: Array<NexusGenRootTypes['Drawing'] | null> | null; // [Drawing]
    myFeeds: Array<NexusGenRootTypes['Feed'] | null> | null; // [Feed]
    myFlows: Array<NexusGenRootTypes['Flow'] | null> | null; // [Flow]
    myFunnels: Array<NexusGenRootTypes['Funnel'] | null> | null; // [Funnel]
    myOrganizations: Array<NexusGenRootTypes['Organization'] | null> | null; // [Organization]
    myPresentations: Array<NexusGenRootTypes['Presentation'] | null> | null; // [Presentation]
    mySheets: Array<NexusGenRootTypes['Sheet'] | null> | null; // [Sheet]
    mySounds: Array<NexusGenRootTypes['Sound'] | null> | null; // [Sound]
    myVideos: Array<NexusGenRootTypes['Video'] | null> | null; // [Video]
    presentation: NexusGenRootTypes['Presentation'] | null; // Presentation
    presentationTemplates: Array<NexusGenRootTypes['PresentationTemplate'] | null> | null; // [PresentationTemplate]
    sheet: NexusGenRootTypes['Sheet'] | null; // Sheet
    sound: NexusGenRootTypes['Sound'] | null; // Sound
    video: NexusGenRootTypes['Video'] | null; // Video
  }
  Sheet: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Sound: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Type: { // field return type
    code: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    name: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    documentTree: NexusGenScalars['JSON'] | null; // JSON
    documents: Array<NexusGenRootTypes['Document'] | null> | null; // [Document]
    drawingFiles: NexusGenScalars['JSON'] | null; // JSON
    email: string | null; // String
    feedTree: NexusGenScalars['JSON'] | null; // JSON
    frequency: string | null; // String
    lastTokenReset: NexusGenScalars['DateTime'] | null; // DateTime
    periodTokenUsage: number | null; // Int
    presentationFiles: NexusGenScalars['JSON'] | null; // JSON
    role: string | null; // String
    sheetFiles: NexusGenScalars['JSON'] | null; // JSON
    soundFiles: NexusGenScalars['JSON'] | null; // JSON
    subscription: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    videoFiles: NexusGenScalars['JSON'] | null; // JSON
  }
  Video: { // field return type
    context: NexusGenScalars['JSON'] | null; // JSON
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['User'] | null; // User
    id: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenFieldTypeNames {
  Company: { // field return type name
    createdAt: 'DateTime'
    creator: 'User'
    fields: 'JSON'
    id: 'String'
    updatedAt: 'DateTime'
  }
  CompanySettings: { // field return type name
    createdAt: 'DateTime'
    fields: 'JSON'
    id: 'String'
    updatedAt: 'DateTime'
    user: 'User'
  }
  Contact: { // field return type name
    createdAt: 'DateTime'
    creator: 'User'
    fields: 'JSON'
    id: 'String'
    updatedAt: 'DateTime'
  }
  ContactSettings: { // field return type name
    createdAt: 'DateTime'
    fields: 'JSON'
    id: 'String'
    updatedAt: 'DateTime'
    user: 'User'
  }
  Dashboard: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    updatedAt: 'DateTime'
  }
  Document: { // field return type name
    content: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    html: 'String'
    id: 'String'
    markdown: 'String'
    messages: 'JSON'
    plaintext: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Drawing: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Feed: { // field return type name
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    updatedAt: 'DateTime'
    url: 'String'
  }
  Flow: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    prompt: 'String'
    questionsContext: 'JSON'
    resultsContext: 'JSON'
    type: 'Type'
    updatedAt: 'DateTime'
  }
  Funnel: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    updatedAt: 'DateTime'
  }
  Link: { // field return type name
    createdAt: 'DateTime'
    description: 'String'
    title: 'String'
    updatedAt: 'DateTime'
    url: 'String'
  }
  Mutation: { // field return type name
    createCompany: 'Company'
    createContact: 'Contact'
    createFile: 'String'
    createFlow: 'Flow'
    createOrganization: 'Organization'
    createProject: 'Project'
    deleteCompany: 'String'
    deleteContact: 'String'
    deleteDocument: 'String'
    export: 'String'
    generateTitles: 'Document'
    newCheckout: 'String'
    newDocument: 'Document'
    newDrawing: 'Drawing'
    newFeed: 'Feed'
    newPresentation: 'Presentation'
    newPresentationTemplate: 'PresentationTemplate'
    newSheet: 'Sheet'
    newSound: 'Sound'
    newVideo: 'Video'
    putCompanySettings: 'String'
    putContactSettings: 'String'
    registerUser: 'String'
    simpleUpload: 'JSON'
    updateCompany: 'Company'
    updateContact: 'Contact'
    updateDocument: 'Document'
    updateDrawing: 'Drawing'
    updateFlow: 'Flow'
    updatePresentation: 'Presentation'
    updatePresentationTemplate: 'PresentationTemplate'
    updateSheet: 'Sheet'
    updateSound: 'Sound'
    updateUser: 'User'
    updateVideo: 'Video'
  }
  Organization: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    name: 'String'
    owner: 'User'
    projects: 'Project'
    updatedAt: 'DateTime'
    users: 'User'
  }
  Presentation: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  PresentationTemplate: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    id: 'String'
    key: 'String'
    sourceId: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Project: { // field return type name
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    organization: 'Organization'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    authenticate: 'String'
    company: 'Company'
    contact: 'Contact'
    countCompanies: 'Int'
    countContacts: 'Int'
    document: 'Document'
    drawing: 'Drawing'
    flow: 'Flow'
    getCurrentUser: 'User'
    getFileList: 'JSON'
    getGeneratedText: 'String'
    getGuideQuestions: 'JSON'
    getPortalUrl: 'String'
    getQuestions: 'JSON'
    getRSSData: 'JSON'
    getRevisedContent: 'JSON'
    myCompanies: 'Company'
    myCompanySettings: 'CompanySettings'
    myContactSettings: 'ContactSettings'
    myContacts: 'Contact'
    myDashboards: 'Dashboard'
    myDocuments: 'Document'
    myDrawings: 'Drawing'
    myFeeds: 'Feed'
    myFlows: 'Flow'
    myFunnels: 'Funnel'
    myOrganizations: 'Organization'
    myPresentations: 'Presentation'
    mySheets: 'Sheet'
    mySounds: 'Sound'
    myVideos: 'Video'
    presentation: 'Presentation'
    presentationTemplates: 'PresentationTemplate'
    sheet: 'Sheet'
    sound: 'Sound'
    video: 'Video'
  }
  Sheet: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Sound: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Type: { // field return type name
    code: 'String'
    createdAt: 'DateTime'
    id: 'String'
    name: 'String'
    updatedAt: 'DateTime'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    documentTree: 'JSON'
    documents: 'Document'
    drawingFiles: 'JSON'
    email: 'String'
    feedTree: 'JSON'
    frequency: 'String'
    lastTokenReset: 'DateTime'
    periodTokenUsage: 'Int'
    presentationFiles: 'JSON'
    role: 'String'
    sheetFiles: 'JSON'
    soundFiles: 'JSON'
    subscription: 'String'
    updatedAt: 'DateTime'
    videoFiles: 'JSON'
  }
  Video: { // field return type name
    context: 'JSON'
    createdAt: 'DateTime'
    creator: 'User'
    id: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createCompany: { // args
      fields: string; // String!
    }
    createContact: { // args
      fields: string; // String!
    }
    createFile: { // args
      fileId: string; // String!
      flowId: string; // String!
      prompt: string; // String!
    }
    createFlow: { // args
      prompt: string; // String!
      typeCode: string; // String!
    }
    createOrganization: { // args
      name: string; // String!
    }
    createProject: { // args
      organizationId: string; // String!
      title: string; // String!
    }
    deleteCompany: { // args
      companyId: string; // String!
    }
    deleteContact: { // args
      contactId: string; // String!
    }
    deleteDocument: { // args
      documentId: string; // String!
    }
    export: { // args
      html: string; // String!
      type: string; // String!
    }
    generateTitles: { // args
      treeMd: string; // String!
    }
    newFeed: { // args
      url: string; // String!
    }
    newPresentationTemplate: { // args
      context: string; // String!
      sourceId: string; // String!
      title: string; // String!
    }
    putCompanySettings: { // args
      fields: string; // String!
    }
    putContactSettings: { // args
      fields: string; // String!
    }
    simpleUpload: { // args
      fileData?: string | null; // String
      fileName?: string | null; // String
      fileSize?: number | null; // Int
      fileType?: string | null; // String
    }
    updateCompany: { // args
      companyId: string; // String!
      fields: string; // String!
    }
    updateContact: { // args
      contactId: string; // String!
      fields: string; // String!
    }
    updateDocument: { // args
      content?: string | null; // String
      documentId: string; // String!
      html?: string | null; // String
      markdown?: string | null; // String
      messages?: string | null; // String
      plaintext?: string | null; // String
      title?: string | null; // String
    }
    updateDrawing: { // args
      context?: string | null; // String
      drawingId: string; // String!
      title?: string | null; // String
    }
    updateFlow: { // args
      flowId: string; // String!
      questionsContext?: string | null; // String
      resultsContext?: string | null; // String
    }
    updatePresentation: { // args
      context?: string | null; // String
      presentationId: string; // String!
      title?: string | null; // String
    }
    updatePresentationTemplate: { // args
      context: string; // String!
      presentationTemplateId: string; // String!
    }
    updateSheet: { // args
      context?: string | null; // String
      sheetId: string; // String!
      title?: string | null; // String
    }
    updateSound: { // args
      context?: string | null; // String
      soundId: string; // String!
      title?: string | null; // String
    }
    updateUser: { // args
      documentTree?: string | null; // String
      drawingFiles?: string | null; // String
      feedTree?: string | null; // String
      presentationFiles?: string | null; // String
      sheetFiles?: string | null; // String
      soundFiles?: string | null; // String
      videoFiles?: string | null; // String
    }
    updateVideo: { // args
      context?: string | null; // String
      title?: string | null; // String
      videoId: string; // String!
    }
  }
  Query: {
    company: { // args
      companyId: string; // String!
    }
    contact: { // args
      contactId: string; // String!
    }
    document: { // args
      documentId: string; // String!
    }
    drawing: { // args
      drawingId: string; // String!
    }
    flow: { // args
      flowId: string; // String!
    }
    getFileList: { // args
      flowId: string; // String!
      getThis: string; // String!
    }
    getGeneratedText: { // args
      contextText: string; // String!
    }
    getGuideQuestions: { // args
      fileApp: string; // String!
      fileTitle: string; // String!
      sectionContent: string; // String!
    }
    getQuestions: { // args
      fileApp: string; // String!
      fileTitle: string; // String!
      flowId: string; // String!
      getThis: string; // String!
    }
    getRSSData: { // args
      url: string; // String!
    }
    getRevisedContent: { // args
      fileApp: string; // String!
      fileTitle: string; // String!
      sectionContent: string; // String!
      sectionQuestions: string; // String!
    }
    myCompanies: { // args
      skip: number; // Int!
      take: number; // Int!
    }
    myContacts: { // args
      skip: number; // Int!
      take: number; // Int!
    }
    presentation: { // args
      presentationId: string; // String!
    }
    sheet: { // args
      sheetId: string; // String!
    }
    sound: { // args
      soundId: string; // String!
    }
    video: { // args
      videoId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}
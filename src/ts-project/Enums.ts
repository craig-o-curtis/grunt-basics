module plsRemindMe {

    export enum DataLoadStatuses{
        Initial = 1,
        Fetching = 2,
        NoResults = 3,
        NoFilterResults = 4,
        FoundResults = 5
    }

    export enum ReminderStatuses {
        Pending = 1,
        Overdue = 2
    }

    export enum FrequencyTypes{
        Once = 1,
        Weekly = 2,
        BiWeekly = 3,
        Monthly = 4,
        BiMonthly = 5,
        Quarterly = 6,
        SemiAnnually = 7,
        Yearly = 8
    }

    export enum ReminderPriorityTypes{
        Normal = 1,
        High = 2,
        Urgent = 3,
        HairsOnFire = 4
    }

    export enum ForcastingType {
        All = 1,
        Today = 2,
        Tomorrow = 3,
        ThisWeek = 4,
        NextWeek = 5,
        ThisMonth = 6,
        NextMonth = 7,
        Overdue = 98,
        Scheduled = 99
    }
}
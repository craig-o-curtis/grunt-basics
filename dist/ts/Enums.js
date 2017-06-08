var plsRemindMe;
(function (plsRemindMe) {
    (function (DataLoadStatuses) {
        DataLoadStatuses[DataLoadStatuses["Initial"] = 1] = "Initial";
        DataLoadStatuses[DataLoadStatuses["Fetching"] = 2] = "Fetching";
        DataLoadStatuses[DataLoadStatuses["NoResults"] = 3] = "NoResults";
        DataLoadStatuses[DataLoadStatuses["NoFilterResults"] = 4] = "NoFilterResults";
        DataLoadStatuses[DataLoadStatuses["FoundResults"] = 5] = "FoundResults";
    })(plsRemindMe.DataLoadStatuses || (plsRemindMe.DataLoadStatuses = {}));
    var DataLoadStatuses = plsRemindMe.DataLoadStatuses;
    (function (ReminderStatuses) {
        ReminderStatuses[ReminderStatuses["Pending"] = 1] = "Pending";
        ReminderStatuses[ReminderStatuses["Overdue"] = 2] = "Overdue";
    })(plsRemindMe.ReminderStatuses || (plsRemindMe.ReminderStatuses = {}));
    var ReminderStatuses = plsRemindMe.ReminderStatuses;
    (function (FrequencyTypes) {
        FrequencyTypes[FrequencyTypes["Once"] = 1] = "Once";
        FrequencyTypes[FrequencyTypes["Weekly"] = 2] = "Weekly";
        FrequencyTypes[FrequencyTypes["BiWeekly"] = 3] = "BiWeekly";
        FrequencyTypes[FrequencyTypes["Monthly"] = 4] = "Monthly";
        FrequencyTypes[FrequencyTypes["BiMonthly"] = 5] = "BiMonthly";
        FrequencyTypes[FrequencyTypes["Quarterly"] = 6] = "Quarterly";
        FrequencyTypes[FrequencyTypes["SemiAnnually"] = 7] = "SemiAnnually";
        FrequencyTypes[FrequencyTypes["Yearly"] = 8] = "Yearly";
    })(plsRemindMe.FrequencyTypes || (plsRemindMe.FrequencyTypes = {}));
    var FrequencyTypes = plsRemindMe.FrequencyTypes;
    (function (ReminderPriorityTypes) {
        ReminderPriorityTypes[ReminderPriorityTypes["Normal"] = 1] = "Normal";
        ReminderPriorityTypes[ReminderPriorityTypes["High"] = 2] = "High";
        ReminderPriorityTypes[ReminderPriorityTypes["Urgent"] = 3] = "Urgent";
        ReminderPriorityTypes[ReminderPriorityTypes["HairsOnFire"] = 4] = "HairsOnFire";
    })(plsRemindMe.ReminderPriorityTypes || (plsRemindMe.ReminderPriorityTypes = {}));
    var ReminderPriorityTypes = plsRemindMe.ReminderPriorityTypes;
    (function (ForcastingType) {
        ForcastingType[ForcastingType["All"] = 1] = "All";
        ForcastingType[ForcastingType["Today"] = 2] = "Today";
        ForcastingType[ForcastingType["Tomorrow"] = 3] = "Tomorrow";
        ForcastingType[ForcastingType["ThisWeek"] = 4] = "ThisWeek";
        ForcastingType[ForcastingType["NextWeek"] = 5] = "NextWeek";
        ForcastingType[ForcastingType["ThisMonth"] = 6] = "ThisMonth";
        ForcastingType[ForcastingType["NextMonth"] = 7] = "NextMonth";
        ForcastingType[ForcastingType["Overdue"] = 98] = "Overdue";
        ForcastingType[ForcastingType["Scheduled"] = 99] = "Scheduled";
    })(plsRemindMe.ForcastingType || (plsRemindMe.ForcastingType = {}));
    var ForcastingType = plsRemindMe.ForcastingType;
})(plsRemindMe || (plsRemindMe = {}));
//# sourceMappingURL=Enums.js.map
export interface User {
    sleepTime: number
    wakeTime: number
    goals: string[]
    routines: Routine[],
    unscheduledTasks:UnscheduledTask[],
    scheduledTasks: ScheduledTask[],
}

export interface ScheduleSlot {
    start: string,
    end: string,
    activity: string,
    color: string,
    isContinuation: boolean,
    isAILocked: boolean,
}

export interface Routine {
    title: string
    start: number,
    end: number,
    isConflicting: string,
    active: boolean,
    color: string,
}

export interface ScheduledTask {
    title: string,
    start: number,
    end: number,
    color: string,
}

export interface UnscheduledTask {
    title: string,
    duration: string,
    color: string,
}

export interface Goal {

}

export interface CalanderTabProps {
    schedule: ScheduleSlot[]
    setSchedule: React.Dispatch<React.SetStateAction<ScheduleSlot[]>>

    sleepTime: number,
    setSleepTime: React.Dispatch<React.SetStateAction<number>>

    wakeTime: number,
    setWakeTime: React.Dispatch<React.SetStateAction<number>>

    goals: string[],
    setGoals: React.Dispatch<React.SetStateAction<string[]>>

    timeList: string[],

    recomputeSchedule: ()=>void,

    unscheduledTasks: UnscheduledTask[]
    setUnscheduledTasks: React.Dispatch<React.SetStateAction<UnscheduledTask[]>>

    scheduledTasks: ScheduledTask[]
    setScheduledTasks: React.Dispatch<React.SetStateAction<ScheduledTask[]>>
}

export interface ProfileTabProps {
    sleepTime: number,
    setSleepTime: React.Dispatch<React.SetStateAction<number>>

    wakeTime: number,
    setWakeTime: React.Dispatch<React.SetStateAction<number>>

    goals: string[],
    setGoals: React.Dispatch<React.SetStateAction<string[]>>

    timeList: string[],

    recomputeSchedule: ()=>void,

    routineList: Routine[],
    setRoutineList: React.Dispatch<React.SetStateAction<Routine[]>>
}
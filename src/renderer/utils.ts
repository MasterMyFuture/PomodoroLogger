import { Dispatch } from 'redux';

export const genMapDispatchToProp = <T>(actions: { [key: string]: any }) => (
    dispatch: Dispatch
) => {
    const dict: Partial<T> = {};
    for (const name in actions) {
        // @ts-ignore
        const actionCreator = actions[name];
        // @ts-ignore
        dict[name] = (...args: any) => dispatch(actionCreator(...args));
    }

    return dict as T;
};

export const generateRandomName = () => {
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const output = [];
    for (let i = 0; i < 20; i += 1) {
        const index = Math.floor(Math.random() * alpha.length);
        output.push(alpha[index]);
    }

    return output.join('') as string;
};

export function getBetterAppName(appName: string) {
    const name = appName.replace(/\.exe$/g, '');
    return name[0].toUpperCase() + name.slice(1);
}

export function to2digits(num: number) {
    if (num < 10) {
        return `0${Math.floor(num)}`;
    }

    return Math.floor(num).toString();
}

export function formatTime(timeInHour: number) {
    if (timeInHour >= 1000) {
        return `${timeInHour}h`;
    }

    if (timeInHour >= 100) {
        return `${timeInHour.toFixed(1)}h`;
    }
    const hour = Math.floor(timeInHour);
    const minute = Math.floor((timeInHour - hour) * 60 + 0.5);
    return `${to2digits(hour)}h ${to2digits(minute)}m`;
}

export function formatTimeWithoutZero(timeInHour: number) {
    const hour = Math.floor(timeInHour);
    const minute = Math.floor((timeInHour - hour) * 60 + 0.5);
    return `${hour}h ${minute}m`;
}

export function parseTime(formattedTime: string) {
    const matchedH = formattedTime.match(/(\d+)h/);
    const matchedM = formattedTime.match(/(\d+)m/);
    if (matchedH == null || matchedM == null) {
        throw new Error();
    }
    const hour = parseInt(matchedH.entries().next().value[1], 10);
    const minute = parseInt(matchedM.entries().next().value[1], 10);
    return hour + minute / 60;
}

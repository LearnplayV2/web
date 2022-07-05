import moment from "moment";

export function timeAgo(time : string) {
    moment.updateLocale('pt', {
        relativeTime: {
            future: "in %s",
            past: "%s",
            s: number=>number + "s",
            ss: '%ds',
            m: "1m",
            mm: "%dm",
            h: "1h",
            hh: "%dh",
            d: "1d",
            dd: "%dd",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    });

    let secondsElapsed = moment().diff(time, 'seconds');
    let dayStart = moment("2018-01-01").startOf('day').seconds(secondsElapsed);

    if (secondsElapsed > 300) {
        return moment(time).fromNow(true);
    } else if (secondsElapsed < 60) {
        return dayStart.format('s') + 's';
    } else {
        return dayStart.format('m:ss') + 'm';
    }
}
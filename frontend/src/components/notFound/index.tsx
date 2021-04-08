import { FC, useEffect, useState } from "react";

const NotFound: FC = () => {

    const [seconds, setSeconds] = useState<number>(1);

    // useEffect(() => {
    //     const idSetInterval = setInterval(() => {
    //         setSeconds(prev  => {
    //             if (prev === 9) {
    //                 clearInterval(idSetInterval);
    //                 document.location.href = "/login";
    //                 return prev;
    //             }
    //             return prev + 1;
    //         });
    //     }, 1000)
    // }, []);

    const threeDots = () => {
        if ([1, 4, 7].includes(seconds)) return ".";
        if ([2, 5, 8].includes(seconds)) return "..";
        if ([3, 6, 9].includes(seconds)) return "...";
    }

    return (
        <div className="text-center">
            <h1 style={{color: "white"}}>ERROR 404: NOT FOUND</h1>
            {/* eslint-disable-next-line eqeqeq */}
            <h3 style={{color: "white"}}>Redirecting{threeDots()}</h3>
        </div>
    );
}

export default NotFound;
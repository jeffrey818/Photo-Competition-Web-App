import * as React from "react";
import "./style.css"
import {Stack} from "react-bootstrap"

function Winners({winners}){

    return (
        <div>
            <div><div>Winner(s) is/are: </div>
                {winners.map((winner) => (
                    <div key={winner[0]}>
                        <Stack gap={3} >
                            <div className={"bg-light border"}
                            >{winner[0]}, vote number ({winner[2]})</div>
                        </Stack>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Winners;
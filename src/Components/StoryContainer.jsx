import {useEffect, useState} from "react";
import axios from "axios";

const StoryContainer = ({stories}) => {

    return (
        <div>
            {
                stories.map((element, i) => {
                    return (
                        <div>
                            <p key={i}>{element.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default StoryContainer;
import React from 'react'
import './UpcomingEvents.css'
import { getTimelinePosts } from '../../actions/postAction.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'


const UpcomingEvents = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    let { posts, loading } = useSelector((state) => state.postReducer);
    let [posts2, setPosts] = useState([]);
    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
        setPosts(posts);
    }, []);

    const handleSearch = () => {

        let option = document.getElementById("city").value;
        let option2 = document.getElementById("type").value
        if (option !== "" && option2 !== "") {
            posts2 = posts2.filter((post) => post.eventlocation === option);
            posts2 = posts2.filter((post) => post.eventtype === option2);
            setPosts(posts2);
        }
        else if (option === "" && option2 !== "") {
            posts2 = posts2.filter((post) => post.eventtype === option2);
            setPosts(posts2);
        }
        else if (option2 === "" && option !== "") {
            posts2 = posts2.filter((post) => post.eventlocation === option);
            setPosts(posts2);
        }
        else if (option === "" && option2 === "") {
            setPosts(posts);
        }

    }

    return (
        <div className="UpcomingEvents">
            <h3>Upcoming Events For You</h3>
            <div className='SearchOptions'>
                <div>
                    <span>City:</span><select name="Cities" id="city" className='selectbox' defaultValue={""}>
                        <option value="">Clear</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                    </select>
                </div>
                <div>
                    <span>Type:</span><select name="Type" id="type" className='selectbox' defaultValue={""}>
                        <option value="">Clear</option>
                        <option value="Public Talks">Public Talks</option>
                        <option value="Motivational Talks">Motivational Talks</option>
                        <option value="Professional Talk">Professional Talk</option>
                        <option value="Professional Task">Professional Task</option>
                        <option value="Plantation Drives">Plantation Drives</option>
                        <option value="Orphanage Visit">Orphanage Visit</option>
                        <option value="Visiting patients into hospitals">Visiting patients into hospitals</option>
                        <option value="Recreational Visit">Recreational Visit</option>
                        <option value="Old Home Visit">Old Home Visit</option>
                        <option value="Book Reading/Discussion">Book Reading/Discussion</option>
                    </select>
                </div>
                <button className="button s-button" onClick={handleSearch}>Search</button>
            </div>
            {posts2.map((post) => {
                if (post.datatype === "eventt") {
                    return (
                        <div className='event'>
                            <span>{post.eventname}</span>
                            <span>{post.eventtype}</span>
                            <span>{post.eventlocation}</span>
                            <span>{post.eventdate}</span>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default UpcomingEvents
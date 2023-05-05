import '../style/content.css'
import Axios from "axios";
import { useEffect, useState } from "react"

export const Content = () => {

    const allName = {
        name: [
            'family',
            'office',
            'children',
            'college',
            'party',
            'funny',
            'unbelievable',
            'developers',
            'gaming'
        ],
    };

    let [categoryName, setCategoryName] = useState("");
    let [excuses, setExcuses] = useState([]);
    let [textInput, setTextInput] = useState("");
    let [previousExcuse, setPreviousExcuse] = useState('');
    let [valueMatch, setValueMatch] = useState(true);

    const fetchCategoryExcuse = () => {
        if (textInput.length > 0 && !(allName.name.includes(textInput.toLowerCase()))) {
            console.log("Category is Invalid!!!");
            setValueMatch(false);
        } else {
            setValueMatch(true)
        }
        Axios.get(`https://excuser-three.vercel.app/v1/excuse/${categoryName}`).then(
            (res) => {
                const newExcuse = res.data;
                if (newExcuse === previousExcuse) {
                    fetchCategoryExcuse();
                } else {
                    setExcuses(newExcuse)
                    setPreviousExcuse(newExcuse);
                }
            }
        )
    }

    useEffect(() => {
        if (excuses.length === 0) {
            return;
        }
        excuses.map((data) => (console.log(data)))
    }, [excuses]);

    return (
        <div className="mainDiv">
            <h2>Categries:</h2>

            <ol className="list">
                <li>Family</li>
                <li>Office</li>
                <li>Children</li>
                <li>College</li>
                <li>Party</li>
                <li>Funny</li>
                <li>Unbelievable</li>
                <li>Developers</li>
                <li>Gaming</li>
            </ol>

            <p className='para'>Write your category: </p>
            <input
                className="inputArea"
                type="text"
                placeholder="eg: family"
                onChange={
                    (e) => {
                        setCategoryName(e.target.value.toLowerCase());
                        setTextInput(e.target.value)
                    }
                }
            />
            <div className="button">
                {
                    textInput.trim() == "" ?
                        <button className="btn" onClick={ fetchCategoryExcuse }>Generate Random</button> :
                        <button className="btn" onClick={ fetchCategoryExcuse } > Generate</button>
                }
            </div>
            {
                valueMatch ? (
                    excuses.length === 0 ? null : (
                        <div className="excuse">
                            {
                                excuses.map((data) => <p key={ data.id }>
                                    <strong>Excuse: </strong> { data.excuse }
                                    <br />
                                    <strong>Category: </strong> { data.category }
                                </p>)
                            }
                        </div>
                    )
                ) : <p className='wrongValue'>!!enter the valid category!!</p>
            }

        </div>
    )
}

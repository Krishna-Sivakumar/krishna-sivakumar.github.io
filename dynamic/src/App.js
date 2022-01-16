import { useState, useEffect } from 'react';
import axios from 'axios';

function Card(props) {
    const project = props.project;
    return (
        <div key={project.name} className="card">
            {
                project.homepage ?
                    <button className="tag preview" onClick={() => alert(project.homepage)}>preview ⇗</button>
                    : null
            }
            <a href={project.html_url} rel="noreferrer" target="_blank"><h3>{project.name}</h3></a>
            <hr />
            <p>{project.description}</p>
            <button className="tag">{project.language}</button>
            {project.topics.map(tag => <button className="tag">{tag}</button>)}
        </div>
    );
}

async function getData(callback) {
    const response = await axios(
        "https://api.github.com/users/Krishna-Sivakumar/repos"
    );

    const data = response.data;


    callback(
        data
            .filter(item => {
                if (item["language"] && item["description"])
                    return item
            })
            .sort((a, b) => {
                return (a.updated_at < b.updated_at) ? 1 : -1;
            })
    );
}

function App() {

    const [projectIsOpen, setProjectIsOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    let age = new Date(Date.now() - (new Date("2001-11-04")));
    age = age.getFullYear() - 1970;

    useEffect(() => {
        getData(setProjects);
    }, [])

    return (
        <div>
            <h1>Krishna Sivakumar</h1>
            <p>
                <a href="mailto:krishnasivaprogrammer@gmail.com">Email</a>
                <b> | </b>
                <a target="blank" href="https://github.com/Krishna-Sivakumar">Github</a>
                <b> | </b>
                <a href="https://www.linkedin.com/in/krishna-sivakumar-723b621a3" target="blank">LinkedIn</a>
                <b> | </b>
                <a href="#" target="blank">Martial Arts</a>
            </p>
            <p>Hey! I'm Krishna Sivakumar, a {age} year old student who loves to code and talk about it!</p>
            <p>I use Python for everyday scripts and projects, and have a few websites to my name.</p >
            <p>I've been using <i>a lot</i> of javascript, css and html too, and I've been trying to learn a few more languages recently :) </p>

            <h2>
                Projects
                <small
                    style={{ cursor: "pointer" }}
                    onClick={() => { setProjectIsOpen(!projectIsOpen) }}
                >
                    [&#8595;]
                </small>
            </h2>
            <div className="row collapsible" data-collapsed={projectIsOpen ? "" : "collapsed"}>
                {projects.map(project => <Card project={project} />)}
            </div>
        </div >
    );
}

export default App;

import { useState, useEffect } from 'react';
import axios from 'axios';

function Card(props) {
    const project = props.project;
    return (
        <div key={project.name} className="card">
            {
                project.homepage ?
                    <button className="tag preview" onClick={() => window.open(project.homepage)}>preview ⇗</button>
                    : null
            }
            <h3><a href={project.html_url} rel="noreferrer" target="_blank">{project.name}</a></h3>
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
    const [tagList, setTagList] = useState(new Set());

    let age = new Date(Date.now() - (new Date("2001-11-04")));
    age = age.getFullYear() - 1970;

    useEffect(() => {
        getData(data => {
            setProjects([{
                name: "Martial Arts",
                homepage: "https://glow-puzzled-jaw.glitch.me/",
                html_url: "https://glow-puzzled-jaw.glitch.me/",
                description: "A small fighting game demo built for WD101, with html canvases.",
                language: "html",
                topics: []
            }, ...data]);
            setTagList(
                data.reduce((acc, item) => {
                    acc.add(item.language.toLowerCase());
                    return acc;
                }, new Set())
            );
        });
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
            </p>
            <p>Hey! I'm Krishna Sivakumar, a {age} year old student who loves to code and talk about it!</p>
            <p>I use Python for everyday scripts and projects, and have a few websites to my name.</p >
            <p>I've been using <i>a lot</i> of javascript, css and html too, and I've been trying to learn a few more languages recently :) </p>

            <br />

            <h2
                style={{
                    marginTop: "-0.1em"
                }}
            >
                Projects
                <small
                    style={{ cursor: "pointer" }}
                    onClick={() => { setProjectIsOpen(!projectIsOpen) }}
                >
                    [&#8595;]
                </small>
            </h2>

            <div className="collapsible" data-collapsed={projectIsOpen ? "" : "collapsed"}>
                <p>Tags: {Array.from(tagList).map(tag => <button className="tag">{tag}</button>)}</p>
                <div className="row">
                    {projects.map(project => <Card project={project} />)}
                </div>
            </div>
        </div >
    );
}

export default App;

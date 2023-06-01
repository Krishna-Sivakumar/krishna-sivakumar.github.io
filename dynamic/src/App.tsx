import { Suspense, useState, useEffect } from 'react';

interface GithubData {
  name: string,
  html_url: string,
  homepage: string,
  topics: string[],
  description: string,
  language: string,
  updated_at: Date,
}

async function getData() {
  const response = await fetch(
    "https://api.github.com/users/Krishna-Sivakumar/repos"
  );

  const data: GithubData[] = await response.json();

  return data
    .filter(item => {
      if (item["language"] && item["description"])
        return item
    })
    .sort((a, b) => {
      return (a.updated_at < b.updated_at) ? 1 : -1;
    })
}

function Card(project: GithubData) {
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
      {project.topics.map(tag => <button key={tag} className="tag">{tag}</button>)}
    </div>
  );
}

function ProjectList(
  props: { tagList: Set<string>, projects: GithubData[] }
) {
  const { tagList, projects } = props;
  return (
    <>
      <p>Tags: {Array.from(tagList).map(tag => <button key={tag} className="tag">{tag}</button>)}</p>
      <div className="row">
        {projects.map((project: GithubData) => <Card key={project.name} {...project} />)}
      </div>
    </>
  )
}

function App() {

  const [projectIsOpen, setProjectIsOpen] = useState(false);
  const [projects, setProjects] = useState<GithubData[]>([]);
  const [tagList, setTagList] = useState<Set<string>>(new Set());

  const age_date = new Date(Date.now() - (new Date("2001-11-04")).getTime());
  const age = age_date.getFullYear() - 1970;

  useEffect(() => {
    (async () => {
      const data = await getData();
      setProjects(data)
      setTagList(
        data.reduce((acc: Set<string>, item: GithubData) => {
          acc.add(item.language.toLowerCase());
          return acc;
        }, new Set())
      );
    })()
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
        <Suspense fallback={<p>Loading projects...</p>}>
          <ProjectList projects={projects} tagList={tagList} />
        </Suspense>
      </div>

    </div >
  );
}

export default App;

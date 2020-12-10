import React from 'react';

const algorithms = [
    {
        name: "135cipher", description: <p>
            Paragraph with info about <b>this</b> algorithm
        </p>
    },
    {
        name: "newcipher", description: <p>
            Paragraph with info about this <i>algorithm</i>
        </p>
    }
]

export const Home = (props) =>
    <div className="pageContent about">
        <h1>135Code</h1>
        <p>
            Paragraph with information about the 135code website
    </p>

        <h2>Algorithms</h2>
        <p>
            About algorithms in general
    </p>
        <table><tbody>{algorithms.map(algorithm => <tr key={algorithm.name}>
            <td><a href={`/${algorithm.name}`}>{algorithm.name}</a></td>
            <td>{algorithm.description}</td>
        </tr>)}</tbody></table>

        <h2>About The Creators</h2>
        <p>Creators paragraph</p>
        <p>About Jamal</p>
        <p>Liran is a software developer based in Brisbane. Liran specialises in cloud computing, functional programming, and has set up the deployment infrastructure for this site. <a href="https://liranpiade.com">Link to site</a></p>

        <h2>Contact Us</h2>
        <p>Contact info paragraph</p>

    </div>

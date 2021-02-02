import React from 'react';
import { appState } from '../App';

const algorithms = [
    {
        name: "135Cipher", description: <p>
            135Cipher is a shift based deterministic symmetric encryption algorithm and represents the first algorithm created in this collaboration.
        </p>, status: "Complete"
    },
    {
        name: "147Cipher", description: <p>
            147Cipher is a more advanced symmetric encryption algorithm that is currently in the early stages of development. The goal is to build upon 135Cipher.
        </p>, status: "WIP"
    },
    {
        name: "432Compress", description: <p>
            432Compress is a English plain text based compression algorithm that seeks to leverage converting between bases to compress small and large inputs alike.
        </p>, status: "WIP"
    }
]

const tools = [
    {
        name: "BaseTool", description: <p>
            BaseTool can be used to convert integer or float numbers between bases 2 to 86 with added support for custom input and output character sets.
        </p>, status: "Beta"
    },
    {
        name: "CountTool", description: <p>
            CountTool can be used to count and visually present the number of occurences of different characters within a provided input string.
        </p>, status: "WIP"
    }
]

export const Home = (props: {state: appState}) =>
    <div className="pageContent about">
        <h1>135Code</h1>
        <p>This website is home to a growing range of different algorithms focused on manipulating data in different and new ways. It must be noted that nothing on this website has been tested extensively and should not be relied upon for any reason. This having been said, we will try to keep completed algorithms working in a stable and reliable manner where possible. </p>

        <h2>Algorithms</h2>
        <p>
            Below you can find a list of all the algorithms hosted on this website along with a short description of what they are intended to be. You will find a detailed write up for all completed algorithms on their respective pages.
    </p>
        <table className="outlineTable"><tbody>{algorithms.map(algorithm => <tr key={algorithm.name}>
            <td className="smallMargins"><a href={`/${algorithm.name.toLowerCase()}`}>{algorithm.name}</a></td>
            <td className="smallMargins">{algorithm.status}</td>
            <td className="expanded">{algorithm.description}</td>
        </tr>)}</tbody></table>

        <h2>Tools</h2>
        <p>
            In addition to the algorithms hosted on this website, general utility tools are also hosted on this website which can be used to encode data in different ways. All completed tools also have a detailed write up on their respective pages.
    </p>
        <table className="outlineTable"><tbody>{tools.map(tool => <tr key={tool.name}>
            <td className="smallMargins"><a href={`/${tool.name.toLowerCase()}`}>{tool.name}</a></td>
            <td className="smallMargins">{tool.status}</td>
            <td className="expanded">{tool.description}</td>
        </tr>)}</tbody></table>

        <h2>About The Creators</h2>
        <p>This website has been created independently by Jordan A. and Liran Piade out of recreational interest. You can learn a little bit more about each of us just below.</p>
        <table className="outlineTable"><tbody>
            <tr><td className="smallMargins">
                <p>Jordan is a business student who specialises in management but also has recreational interests in both engineering and data manipulation. Jordan has developed all algorithms for this site.</p>
            </td></tr>
            <tr><td className="smallMargins">
                <p>Liran is a software developer based in Brisbane. Liran specialises in cloud computing, functional programming, and has set up the deployment infrastructure for this site. <a href="https://liranpiade.com">Link to site</a></p>
            </td></tr>
        </tbody></table>

        <h2>Contact Us</h2>
        <p>If you find a way to break one of our ciphers, have feedback about some of our algorithms, or have some enquiries regarding the content of this website, feel free to reach out to us. Please note, however, our contact address is not regularly monitored.</p>

        <p>Contact email: 135codes@gmail.com</p>

    </div>

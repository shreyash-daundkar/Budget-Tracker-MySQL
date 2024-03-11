// host

const { host } = new URL(window.location.href);




// Selecting Elements

const tableBody = document.querySelector('#table-body');



// Set axios headers

const token = localStorage.getItem('token');
axios.defaults.headers.common['authorization'] = token;




// Genrate download History

window.addEventListener('DOMContentLoaded', getHistory);
async function getHistory() {
    try {
        const { data } = await axios.get(`http://${host}/download-history`);
        populateTable(data);
    } catch(error) {
        console.log(error);
    }
}

function populateTable(data) {
    
    tableBody.innerHTML = '';

    data.forEach(entry => {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.fileName}</td>
        <td>
        <button onClick="downloadFile('${entry.location}', '${entry.fileName}');" class="btn btn-primary">Download</button>
        </td>
        `;
        tableBody.appendChild(row);
    });
}




// On Download

function downloadFile(url, fileName) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
}

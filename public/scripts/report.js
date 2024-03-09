// host

const { host } = new URL(window.location.href);





// Selecting elements

const dailyReportBtn = document.getElementById('daily-report');
const weeklyReportBtn = document.getElementById('weekly-report');
const monthlyReportBtn = document.getElementById('monthly-report');
const yearlyReportBtn = document.getElementById('yearly-report');
const tableBody = document.getElementById('expense-list');
const premiumBtn = document.getElementById('premium-btn');
const downloadBtn = document.getElementById('download-btn');
const downloadHistoryBtn = document.getElementById('download-history-btn');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const itemsPerPageSelect = document.getElementById('items-per-page');


const token = localStorage.getItem('token');
axios.defaults.headers.common['authorization'] = token;

let isPremium = localStorage.getItem('isPremium');




// On Refresh

if(!localStorage.getItem('perPageLimitReport')) localStorage.setItem('perPageLimitReport', 1);
let limit = localStorage.getItem('perPageLimitReport');
let currPage = 1;

window.addEventListener('DOMContentLoaded', onRefresh);
async function onRefresh() {
    try {
        console.log(downloadBtn, downloadHistoryBtn, isPremium)
        downloadBtn.style.display = 'none';
        downloadHistoryBtn.style.display = 'none';

        itemsPerPageSelect.value = limit;
        loadExpenses(currPage);

        if(isPremium === 'true') {
            premiumBtn.style.display = 'none';
            downloadBtn.style.display = 'inline-block';
            downloadHistoryBtn.style.display = 'inline-block';
        }
    } catch (error) {
        handelErrors(error);
    }
}

async function loadExpenses(currPage) {
    try {
        const { data: { expense, totalPages}} = await axios.get(`http://${host}/expense?currPage=${currPage}&limit=${limit}`);
        
        if(currPage < totalPages) nextBtn.style.display = 'inline-block';
        else nextBtn.style.display = 'none';
        
        if(currPage - 1) prevBtn.style.display = 'inline-block';
        else prevBtn.style.display = 'none';
        
        populateTable(expense);      
    } catch (error) {
        handelErrors(error);
    }
}



// Pagination

nextBtn.addEventListener('click', () => loadExpenses( ++currPage ));

prevBtn.addEventListener('click', () => loadExpenses( --currPage ));

itemsPerPageSelect.addEventListener('change', e => {
    currPage = 1;

    limit = parseInt(e.target.value);
    localStorage.setItem('perPageLimitReport', limit);

    limit = parseInt(e.target.value);

    loadExpenses(currPage);
});





// On Download

downloadBtn.addEventListener('click', downloadReport);

async function downloadReport() { 
    try {
        const { data } = await axios.get(`http://${host}/premium-features/download-report`);
        downloadFile(data.location);
    } catch (error) {
        handelErrors(error);
    }
}


function downloadFile(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = true;
    a.click();
}




// Download History

downloadHistoryBtn.addEventListener('click', () => window.location.href = 'download-history.html');




//  Time Frames Filter

dailyReportBtn.addEventListener('click', () => fetchReport('daily'));
weeklyReportBtn.addEventListener('click', () => fetchReport('weekly'));
monthlyReportBtn.addEventListener('click', () => fetchReport('monthly'));
yearlyReportBtn.addEventListener('click', () => fetchReport('yearly'));


function fetchReport(timeframe) {
    
    let reportData = [];

    switch(timeframe) {
        case 'daily':
           
            break;
        case 'weekly':
            
            break;
        case 'monthly':
            
            break;
        case 'yearly':
            
            break;
    }

    populateTable(reportData);
}




// Utility Function 

function populateTable(data) {
    
    tableBody.innerHTML = '';

    data.forEach(expense => {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

function handelErrors(error) {
    if(error.response.data) console.log(error.response.data.message);
    else console.log(error);
}
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("recordTable");

    function fetchRecords() {
        fetch("/fetch_records")
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = "";
                data.forEach(record => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${record.id}</td>
                        <td contenteditable="true" data-id="${record.id}" data-field="plain_text">${record.plain_text}</td>
                        <td>${record.cipher_method}</td>
                        <td contenteditable="true" data-id="${record.id}" data-field="cipher_text">${record.cipher_text}</td>
                        <td>
                            <button class="edit" onclick="updateRecord(${record.id})">Update</button>
                            <button class="delete" onclick="deleteRecord(${record.id})">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }

    function updateRecord(id) {
        const plainText = document.querySelector(`td[data-id="${id}"][data-field="plain_text"]`).textContent;
        const cipherText = document.querySelector(`td[data-id="${id}"][data-field="cipher_text"]`).textContent;

        fetch("/update_record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, plain_text: plainText, cipher_text: cipherText })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchRecords();
        });
    }

    function deleteRecord(id) {
        if (!confirm("Are you sure you want to delete this record?")) return;

        fetch(`/delete_record/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchRecords();
        });
    }

    fetchRecords();
});

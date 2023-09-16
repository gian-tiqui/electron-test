import { conn, mysql } from "./database.js";

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addButton");
  const updateButton = document.getElementById("updateButton");
  const tbody = document.getElementById("tbodyy");

  function createTableRow(client) {
    const row = document.createElement("tr");

    const nameCol = document.createElement("td");
    nameCol.textContent = client.name;

    const emailCol = document.createElement("td");
    emailCol.textContent = client.email;

    const phoneCol = document.createElement("td");
    phoneCol.textContent = client.phone;

    const addressCol = document.createElement("td");
    addressCol.textContent = client.address;

    const actionsCol = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      document.getElementById("name").value = client.name;
      document.getElementById("email").value = client.email;
      document.getElementById("phone").value = client.phone;
      document.getElementById("address").value = client.address;
      updateButton.dataset.clientId = client.id;

      addButton.style.display = "none";
      updateButton.style.display = "block";
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const deleteQuery = "DELETE FROM `clients` WHERE id = ?";
      conn.query(deleteQuery, [client.id], (deleteErr, deleteRes) => {
        if (deleteErr) {
          console.error(deleteErr);
        } else {
          loadData();
        }
      });
    });

    actionsCol.appendChild(editButton);
    actionsCol.appendChild(deleteButton);

    row.appendChild(nameCol);
    row.appendChild(emailCol);
    row.appendChild(phoneCol);
    row.appendChild(addressCol);
    row.appendChild(actionsCol);

    return row;
  }

  async function loadData() {
    const query = "SELECT * FROM `clients`";
    await conn.query(query, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        tbody.innerHTML = "";

        res.forEach((client) => {
          const row = createTableRow(client);
          tbody.appendChild(row);
        });
      }
    });
  }

  loadData();

  addButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const insertQuery =
      "INSERT INTO `clients` (name, email, phone, address) VALUES (?, ?, ?, ?)";
    conn.query(insertQuery, [name, email, phone, address], (err, res) => {
      if (err) {
        console.error(err);
      } else {
        addForm.reset();
        loadData();
      }
    });
  });

  updateButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const clientId = updateButton.dataset.clientId;

    const updateQuery =
      "UPDATE `clients` SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
    conn.query(
      updateQuery,
      [name, email, phone, address, clientId],
      (err, res) => {
        if (err) {
          console.error(err);
        } else {
          addForm.reset();
          addButton.style.display = "block";
          updateButton.style.display = "none";
          loadData();
        }
      }
    );
  });
});

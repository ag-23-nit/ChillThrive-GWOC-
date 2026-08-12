document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("chillThriveCurrentUser") || "null");
    const next = "BookSession.html";

    // Require login before booking.
    if (!currentUser) {
        sessionStorage.setItem("chillThriveNext", next);
        window.location.href = "login.html";
        return;
    }

    document.getElementById("bookingName").value = currentUser.name || "";
    document.getElementById("bookingEmail").value = currentUser.email || "";

    const service = document.getElementById("service");
    const people = document.getElementById("people");
    const summaryService = document.getElementById("summaryService");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryTotal = document.getElementById("summaryTotal");
    const date = document.getElementById("date");

    date.min = new Date().toISOString().split("T")[0];

    function updateSummary() {
        const option = service.options[service.selectedIndex];
        const price = Number(option?.dataset.price || 0);
        const count = Number(people.value || 1);

        summaryService.textContent = option?.value || "Not selected";
        summaryPrice.textContent = `₹${price.toLocaleString("en-IN")}`;
        summaryTotal.textContent = `₹${(price * count).toLocaleString("en-IN")}`;
    }

    service.addEventListener("change", updateSummary);
    people.addEventListener("input", updateSummary);
    updateSummary();

    const requestedService = new URLSearchParams(window.location.search).get("service");
    const serviceMap = {
        ice: "Ice Bath Therapy",
        jacuzzi: "Jacuzzi Therapy",
        steam: "Steam Bath",
        "ice-steam": "Ice Bath + Steam",
        "ice-jacuzzi": "Ice Bath + Jacuzzi",
        "full-recovery": "Full Recovery Combo"
    };
    if (serviceMap[requestedService]) {
        const wanted = serviceMap[requestedService];
        const optionIndex = [...service.options].findIndex(option => option.value === wanted);
        if (optionIndex >= 0) {
            service.selectedIndex = optionIndex;
            updateSummary();
        }
    }

    document.getElementById("bookingForm").addEventListener("submit", event => {
        event.preventDefault();

        const selected = service.options[service.selectedIndex];

        const booking = {
            id: "CT-" + Date.now(),
            name: document.getElementById("bookingName").value.trim(),
            email: document.getElementById("bookingEmail").value.trim(),
            phone: document.getElementById("bookingPhone").value.trim(),
            service: selected.value,
            date: date.value,
            time: document.getElementById("time").value,
            people: Number(people.value),
            notes: document.getElementById("notes").value.trim(),
            total: Number(selected.dataset.price) * Number(people.value)
        };

        const bookings = JSON.parse(
            localStorage.getItem("chillThriveBookings") || "[]"
        );

        bookings.push(booking);

        localStorage.setItem(
            "chillThriveBookings",
            JSON.stringify(bookings)
        );

        localStorage.setItem(
            "chillThriveLastBooking",
            JSON.stringify(booking)
        );

        window.location.href = "booking-success.html";
    });

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("chillThriveCurrentUser");
            sessionStorage.removeItem("chillThriveNext");

            window.location.href = "login.html";
        });
    }
});
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function SQATest() {
    const driverPath = "D:\\UNIVERSITAS PELITA BANGSA\\SEMESTER 7\\SQA\\MK SQA\\sqa-main\\drivers\\chromedriver.exe";
    const service = new chrome.ServiceBuilder(driverPath);

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeService(service)
        .build();

    try {
        // 1. Klik tombol "Alerts, Frame & Windows"
        await driver.get("https://demoqa.com/");
        await driver.manage().window().maximize();

        // Sembunyikan iframe iklan di halaman utama
        await hideIframes(driver);

        const alertsFrameWindowsButton = await driver.wait(
            until.elementLocated(By.xpath("//h5[text()='Alerts, Frame & Windows']")),
            30000
        );
        await driver.executeScript("arguments[0].scrollIntoView(true);", alertsFrameWindowsButton);
        await driver.executeScript("arguments[0].click();", alertsFrameWindowsButton);
        console.log("Poin 1 berhasil dijalankan.");

        // 2. Isi form di halaman "Forms"
        await driver.get("https://demoqa.com/automation-practice-form");

        // Sembunyikan iframe iklan di halaman form
        await hideIframes(driver);

        const firstNameInput = await driver.wait(
            until.elementLocated(By.id("firstName")),
            30000
        );
        await firstNameInput.sendKeys("Budi");

        const lastNameInput = await driver.findElement(By.id("lastName"));
        await lastNameInput.sendKeys("Ariandto");

        const emailInput = await driver.findElement(By.id("userEmail"));
        await emailInput.sendKeys("ariandto@gmail.com");

        // Pilih Gender
        await driver.executeScript(
            "document.querySelector('input[id=\"gender-radio-1\"]').click();"
        );

        const mobileNumber = await driver.findElement(By.id("userNumber"));
        await mobileNumber.sendKeys("081234567890");

        // Isi Date of Birth
        await driver.executeScript(
            "document.getElementById('dateOfBirthInput').value = '08 Dec 2000';"
        );

        const subjectsInput = await driver.findElement(By.id("subjectsInput"));
        await subjectsInput.sendKeys("Maths");
        await subjectsInput.sendKeys("\uE007"); // Enter key

        // Pilih Hobbies
        const hobbiesCheckbox = await driver.findElement(By.css("label[for='hobbies-checkbox-1']"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", hobbiesCheckbox);
        await driver.executeScript("arguments[0].click();", hobbiesCheckbox); // Klik dengan JavaScript

        // Upload Picture
        const picturePath = "D:\\UNIVERSITAS PELITA BANGSA\\SEMESTER 7\\SQA\\images.jpg";
        await driver.findElement(By.id("uploadPicture")).sendKeys(picturePath);

        const currentAddress = await driver.findElement(By.id("currentAddress"));
        await currentAddress.sendKeys("Jl. Contoh No. 123, Jakarta, Indonesia");

        const stateInput = await driver.findElement(By.id("react-select-3-input"));
        await stateInput.sendKeys("NCR");
        await stateInput.sendKeys("\uE007"); // Enter key

        const cityInput = await driver.findElement(By.id("react-select-4-input"));
        await cityInput.sendKeys("Delhi");
        await cityInput.sendKeys("\uE007"); // Enter key

        const submitButton = await driver.findElement(By.id("submit"));
        await driver.executeScript("arguments[0].click();", submitButton);
        console.log("Form berhasil diisi dan dikirim.");
        console.log("Poin 2 berhasil dijalankan.");

        // 3. Pilih opsi di halaman "Select Menu"
        await driver.get("https://demoqa.com/select-menu");
        const dropdown = await driver.findElement(By.id("oldSelectMenu"));
        await dropdown.sendKeys("Blue");
        console.log("Poin 3 berhasil dijalankan.");

        // 4. Pilih checkbox di halaman "Checkbox"
        await driver.get("https://demoqa.com/checkbox");

        // Sembunyikan iframe iklan di halaman checkbox
        await hideIframes(driver);

        const homeCheckbox = await driver.wait(
            until.elementLocated(By.xpath("//span[text()='Home']")),
            30000
        );
        await driver.executeScript("arguments[0].scrollIntoView(true);", homeCheckbox);
        await driver.executeScript("arguments[0].click();", homeCheckbox); // Klik dengan JavaScript
        console.log("Poin 4 berhasil dijalankan.");

        // 5. Akses halaman "Alerts", klik tombol untuk memunculkan alert, dan terima alert
        await driver.get("https://demoqa.com/alerts");

        // Sembunyikan iframe iklan sebelum klik tombol alert
        await hideIframes(driver);

        const alertButton = await driver.wait(
            until.elementLocated(By.id("alertButton")),
            30000
        );

        // Memastikan tombol alert dapat diklik
        await driver.executeScript("arguments[0].scrollIntoView(true);", alertButton);
        await alertButton.click(); // Klik tombol untuk memunculkan alert

        // Tunggu alert dan terima
        await driver.wait(until.alertIsPresent(), 5000); // Tunggu alert muncul
        const alert = await driver.switchTo().alert();
        await alert.accept(); // Terima alert
        console.log("Alert diterima, Poin 5 berhasil dijalankan.");

    } catch (error) {
        console.error(`Kesalahan WebDriver: ${error.message}`);
    } finally {
        await driver.quit();
    }
})();

// Fungsi untuk menyembunyikan semua iframe iklan
async function hideIframes(driver) {
    try {
        const iframes = await driver.findElements(By.css("iframe"));
        for (const iframe of iframes) {
            await driver.executeScript("arguments[0].style.display='none';", iframe);
        }
        console.log("Semua iframe disembunyikan.");
    } catch (error) {
        console.warn("Tidak ada iframe ditemukan.");
    }
}

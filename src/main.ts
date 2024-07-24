import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
        <div class="result">
            <div id="preview"></div>
        </div>

        <div class="settings">
            <div class="range-wrapper">
                <label for="x-shadow">Horizontal Shadow :</label>
                <input type="range" id="x-shadow" min="-100" max="100" value="-6">
            </div>
            <div class="range-wrapper">
                <label for="y-shadow">Vertical Shadow :</label>
                <input type="range" id="y-shadow" min="-100" max="100" value="15">
            </div>
            <div class="range-wrapper">
                <label for="blur-r">Blur Radius :</label>
                <input type="range" id="blur-r" min="0" max="100" value="30">
            </div>
            <div class="range-wrapper">
                <label for="spread-r">Spread Radius :</label>
                <input type="range" id="spread-r" min="-50" max="50" value="6">
            </div>
            <div class="range-wrapper">
                <label for="border-r">Border Radius :</label>
                <input type="range" id="border-r" min="0" max="100" step="1" value="70">
            </div>
            <div class="range-wrapper">
                <label for="shadow-opacity">Shadow Opacity :</label>
                <input type="range" id="shadow-opacity" min="0" max="1" step="0.1" value="0.5">
            </div>

            <div class="input-wrapper">
                <label for="inset-shadow">Inset Shadow :</label>
                <input type="checkbox" id="inset-shadow">
            </div>

            <div class="color-wrapper">
                <label for="shadow-color">Shadow Color :</label>
                <input type="color" id="shadow-color">
            </div>

        </div>

        <div class="code-container">
            <textarea id="styles" rows="2"></textarea>
            <button id="copy-styles">Copy Styles</button>
        </div>
    </div>
`;

const preview = document.getElementById("preview") as HTMLDivElement;
const styles = document.getElementById("styles") as HTMLTextAreaElement;
const ranges = document.querySelectorAll(".settings input");
const copyButton = document.getElementById("copy-styles") as HTMLButtonElement;

ranges.forEach((slider) => {
    slider.addEventListener("input", () => {
        const xShadow = (document.getElementById("x-shadow") as HTMLInputElement).value;
        const yShadow = (document.getElementById("y-shadow") as HTMLInputElement).value;
        const blurRadius = (document.getElementById("blur-r") as HTMLInputElement).value;
        const spreadRadius = (document.getElementById("spread-r") as HTMLInputElement).value;
        const shadowColor = (document.getElementById("shadow-color") as HTMLInputElement).value;
        const shadowOpacity = (document.getElementById("shadow-opacity") as HTMLInputElement).value;
        const shadowInset = (document.getElementById("inset-shadow") as HTMLInputElement).checked;
        const borderRadius = (document.getElementById("border-r") as HTMLInputElement).value;

        const boxShadow = `${shadowInset ? "inset " : ""} ${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;

        preview.style.boxShadow = boxShadow;
        preview.style.borderRadius = `${borderRadius}px`;

        styles.textContent = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;

        function hexToRgba(shadowColor: string, shadowOpacity: string): string {
            const r = parseInt(shadowColor.substr(1, 2), 16);
            const g = parseInt(shadowColor.substr(3, 2), 16);
            const b = parseInt(shadowColor.substr(5, 2), 16);

            return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
        }
    });

});

copyButton.addEventListener("click", async () => {
    styles.select();
    await navigator.clipboard.writeText(styles.value);
    copyButton.innerText = "Copied!";
    setTimeout(() => {
        copyButton.innerText = "Copy Styles";
    }, 500);
});
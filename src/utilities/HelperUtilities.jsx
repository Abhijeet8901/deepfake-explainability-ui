
export const HelperUtilities = {
    dataURLtoFile: (dataurl, filename) => {
        const [header, b64] = dataurl.split(',');
        const mime = header.match(/:(.*?);/)[1];
        const binary = atob(b64);
        const len = binary.length;
        const u8arr = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            u8arr[i] = binary.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
    },
    formatComplexExplanation: (text) => {
        if (!text) return "";

        const lines = text.split('\n');
        const formattedLines = lines.map(line => {
        if (line.startsWith("1. Whether the picture has been tampered with")) {
            const parts = line.split(":");
            if (parts.length > 1) {
            return "1." + parts.slice(1).join(":").trim();
            }
        }
        return line;
        });

        return formattedLines.join('\n');
    }
};
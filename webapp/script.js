document.getElementById("fileinput").addEventListener("change", async function(event) {
    const audioFile = this.files[0];

    const data = new FormData()
    data.append('audio_file', audioFile);

    let loadingDots = "";
    const interval = setInterval(function() {
        loadingDots += ".";
        if(loadingDots.length > 3) loadingDots = "";
        document.getElementById("output").value = `Chargement de ${audioFile.name}${loadingDots}`;
    }, 500);
    document.getElementById("output").value = `Chargement de ${audioFile.name}${loadingDots}`;

    const response = await fetch('/whisper/asr?output=json&language=fr', {
        method: 'POST',
        body: data
    });

    const { text, segments, language } = await response.json();
    
    clearInterval(interval);
    document.getElementById("output").value = text.replace(/\s*\.+\s*/g, ".\n\n").trim();
});
export async function sendUserInformationToZapier(email: string, name: string, phoneNumber: string) {
  try {
    await fetch("https://hooks.zapier.com/hooks/catch/23311008/u3amd32/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
      }),
    }).then(() => console.log("Dados enviados com sucesso."));
  } catch (error) {
    console.log("Erro ao enviar dados para Zapier:", error);
    throw error;
  }
}

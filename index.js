const testRequestLimits = async () => {
  for (let i = 0; i < 200; i++) {
    try {
      const response = await axios.post(GRAPHQL_API, {
        query: `mutation{ authorizationRequest(email: "${email}"){ success, errorMessage } }`,
      });

      if (response.status === 429) {
        countOf429s++;
      }
    } catch (error) {
      console.error(
        `Error on request ${i}:`,
        error.response.status,
        error.response.statusText
      );
      if (error.response.status === 429) {
        countOf429s++;
      }
    }
  }

  console.log(`Received ${countOf429s} rate limiting responses.`);
};

testRequestLimits();

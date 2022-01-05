import { createServer } from "miragejs"

createServer({
  seeds(server) {
    server.db.loadData({
      consents: [
        { name: 'John Test', email: 'john@test.com', consents: ['newsletter'] },
        { name: 'Donald Trump', email: 'donald@trump.com', consents: ['newsletter', 'ads'] },
        { name: 'Joe Biden', email: 'joe@biden.com', consents: ['ads', 'stats'] },
        { name: 'John Travolta', email: 'john@travolta.com', consents: ['ads', 'stats', 'newsletter'] },
        { name: 'Quentin Tarantino', email: 'quentin@tarantino.com', consents: ['ads', 'newsletter'] },
      ],
    })
  },

  routes() {
    this.get("/consents", (schema, request) => {
      return schema.db.consents
    })

    this.post("/consents", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      return schema.db.consents.insert(attrs);
    })
  },
})

const addConsent = async (consent) => {
  const consents = await fetch("/consents", { method: 'post', body: JSON.stringify(consent) })
    .then((response) => response.json())

  return consents;
}

const fetchConsents = async () => {
  const consents = await fetch("/consents")
    .then((response) => response.json())

  return consents;
}

export { addConsent, fetchConsents }
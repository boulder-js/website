import { upcomingEvents } from 'gitevents-fetch'

export async function onRequest(context) {
  try {
    const { number } = context.params
    const eventNumber = parseInt(number)

    if (isNaN(eventNumber)) {
      return new Response(JSON.stringify({ error: 'Invalid event number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Fetch all upcoming events and find the specific one
    const events = await upcomingEvents('boulder-js', 'events')
    const event = events.find((e) => e.number === eventNumber)

    if (!event) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    return new Response(JSON.stringify(event), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

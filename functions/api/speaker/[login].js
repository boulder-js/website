export async function onRequest(context) {
  try {
    const { login } = context.params

    if (!login) {
      return new Response(JSON.stringify({ error: 'Login is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Fetch user data from GitHub API
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Add token if available to increase rate limits
        ...(context.env?.GITHUB_TOKEN && {
          Authorization: `Bearer ${context.env.GITHUB_TOKEN}`
        })
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const userData = await response.json()

    // Return only the fields we need
    const speaker = {
      login: userData.login,
      name: userData.name || userData.login,
      bio: userData.bio,
      avatarUrl: userData.avatar_url,
      url: userData.html_url,
      company: userData.company,
      location: userData.location,
      twitterUsername: userData.twitter_username
    }

    return new Response(JSON.stringify(speaker), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

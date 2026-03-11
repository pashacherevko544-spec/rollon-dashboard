export const config = { runtime: 'edge' }

export default async function handler(req) {
  const url = new URL(req.url)
  // /api/img?p=bng&id=book_of_gold_multichance
  const provider = url.searchParams.get('p')
  const id = url.searchParams.get('id')

  if (!provider || !id) return new Response('Bad request', { status: 400 })

  let cdnUrl
  if (provider === 'bng') {
    cdnUrl = `https://static.bgaming-network.com/games/${id}/en_US/web/desktop/preview.png`
  } else if (provider === 'pp') {
    cdnUrl = `https://demogamesfree.pragmaticplay.net/gs2c/common/images/games/${id}.png`
  } else {
    return new Response('Unknown provider', { status: 404 })
  }

  try {
    const res = await fetch(cdnUrl, {
      headers: {
        'Referer': provider === 'bng' ? 'https://bgaming-network.com/' : 'https://pragmaticplay.net/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
    })

    if (!res.ok) return new Response('Image not found', { status: 404 })

    const img = await res.arrayBuffer()
    const ct = res.headers.get('content-type') || 'image/png'

    return new Response(img, {
      status: 200,
      headers: {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response('Fetch error: ' + e.message, { status: 502 })
  }
}

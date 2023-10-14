import {Redis} from '@upstash/redis/cloudflare'

const redis = new Redis({
	url: "<upstash_redis_url>",
	token: "<upstash_redis_token>"
})

export interface Env {
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const { pathname } = new URL(request.url)

		switch (pathname) {
			case '/write': {
				const counter = await redis.incr('counter')

				return new Response(JSON.stringify({ counter }), {
					headers: { 'content-type': 'application/json' },
				})
			}
			case '/read': {
				const counter = await redis.get('counter')

				return new Response(JSON.stringify({ counter }), {
					headers: { 'content-type': 'application/json' },
				})
			}
			default: {
				return new Response('Not found', { status: 404 })
			}
		}
	},
};

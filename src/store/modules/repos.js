import axios from 'axios'

const repos = {
    namespaced: true,
    state: {
        repos: [],
        page: 1,
        perPage: 10,
        since: 0,
        nextSince: 0,
        prevSince: 0,
        lastSince: 0,
        totalPages: 1000,
        url: 'https://api.github.com/repositories',
        headers: {'Authorization': 'token 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'}

    },
    mutations: {
        setRepos(state, payload) {
            state.repos = payload
        },
        setPage(state, payload) {
            console.log(payload)
            if (payload === 'next') {
                state.since = state.nextSince
                state.page = state.page+1
            }
            if (payload === 'prev') {
                state.since = state.prevSince
                state.page = state.page-1
            }
        },
        setTotalPage(state, payload) {
            state.totalPage = payload
        },
        setNextSince(state, payload) {
            state.nextSince = payload
        },
        setSince(state, payload) {
            state.since = payload
        },
        setPrevSince(state, payload) {
            state.prevSince = payload
        },
        setLastSince(state, payload) {
            state.lastSince = payload
            state.totalPages = state.totalPages + 1
        },
    },
    actions: {
        nextPage({ dispatch, commit }) {
            commit('setPage', 'next')
            dispatch('setRepos')
        },
        prevPage({ dispatch, commit }) {
            commit('setPage', 'prev')
            dispatch('setRepos')
        },
        setRepos({ state, commit }) {
            let repo = []
            axios.get(state.url, {params: {since: state.since, per_page: state.perPage}, headers: state.headers}).then((resp) => {
                //Pages
                let links = resp.headers.link.split(', ')
                links.forEach((e, i) => {
                    links[i] = e.split('; ')
                })
                const next = links.find(e => e[1] === 'rel="next"')
                if (next) {
                    let url = new URL(next[0].slice(1, -1))
                    const nextSince = url.searchParams.get('since')
                    if (nextSince && nextSince > state.lastSince) commit('setLastSince', nextSince)
                    commit('setNextSince', nextSince)
                }
                const prev = links.find(e => e[1] === 'rel="prev"')
                if (prev) {
                    let url = new URL(next[0].slice(1, -1))
                    const prevSince = url.searchParams.get('since')
                    commit('setPrevSince', prevSince)
                }

                //repos
                resp.data.forEach(element => {
                    axios.get(element.url, {headers: state.headers}).then((r) => {
                        let tmp = r.data
                        repo.push(tmp)
                    })
                });
            })
            commit('setRepos', repo)
        }
    },
    getters: {
        getRepos: (state) => state.repos,
        getPage: (state) => state.page,
        getTotalPages: (state) => state.totalPages,
    }
}

export default repos
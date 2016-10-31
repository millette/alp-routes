'use strict'

require('dotenv-safe').load({
  silent: true,
  sample: 'node_modules/alp-routes/.env.example'
})

// self
const pkg = require('./package.json')
// const utils = require('./lib/utils')

const after = (options, server, next) => {
  server.views({
    engines: { html: require('lodash-vision') },
    path: 'templates',
    partialsPath: 'templates/partials',
    isCached: process.env.TEMPLATE_CACHE.toLowerCase() === 'true'
  })

  const pages = [
    'abonnez-vous',
    'accueil',
    'accueil-tous',
    'agenda',
    'allo',
    'apropos',
    'bottin',
    'bye',
    'faq',
    'moi',
    'page-ext-1',
    'page-int-1',
    'resultats',
    'section-acteurs',
    'section-actionnaires',
    'section-entreprise',
    'sujet-acericulture',
    'sujet-agriculture',
    'tests'
  ]

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) { reply.redirect('/accueil') }
  })

  pages.forEach((page) => {
    server.route({
      method: 'GET',
      path: '/' + page,
      handler: { view: page }
    })
  })

  next()
}

exports.register = (server, options, next) => {
  const deps = Object.keys(pkg.dependencies)
    .filter((x) => pkg.notHapiPlugins.indexOf(x) === -1)
  server.dependency(deps, after.bind(null, options))
  next()
}

exports.register.attributes = {
  name: pkg.name,
  version: pkg.version
}

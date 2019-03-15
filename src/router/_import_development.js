module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
// const Index1 = r => require.ensure([],() => r(require('@/components/Index1')), 'Index1');

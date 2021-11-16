import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['modal'])
  },
  methods: {
    ...mapActions(['showModal', 'hideModal', 'switchButton'])
  }
}

import { fetchComments } from '@/services/api';
import CommentTable from '@/components/CommentTable.vue';

export default {
    name: 'App',
    components: { CommentTable },
    data() {
        return {
            comments: [],
            loading: false
        };
    },
    methods: {
        async loadData() {
            this.loading = true;
            try {
                this.comments = await fetchComments();
            } catch (e) {
                console.error("Gagal memuat data:", e);
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.loadData();
    }
};
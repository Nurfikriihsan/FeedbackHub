export default {
    props: {
        comments: { type: Array, default: () => [] },
        loading: { type: Boolean, default: false }
    },
    data() {
        return {
            page: 1,
            itemsPerPage: 7,
            searchQuery: ''
        };
    },
    watch: {
        searchQuery() {
            this.page = 1;
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredComments.length / this.itemsPerPage);
        },
        filteredComments() {
            const query = this.searchQuery.toLowerCase();
            if (!query) return this.comments;

            return this.comments.filter(comment =>
                comment.body.toLowerCase().includes(query) ||
                comment.name.toLowerCase().includes(query) ||
                comment.email.toLowerCase().includes(query)
            );
        },
        paginatedComments() {
            const start = (this.page - 1) * this.itemsPerPage;
            return this.filteredComments.slice(start, start + this.itemsPerPage);
        }
    },
    methods: {
        nextPage() {
            if (this.page < this.totalPages) this.page++;
        },
        prevPage() {
            if (this.page > 1) this.page--;
        },
        getInitials(name) {
            return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
        },
        truncate(text, length) {
            return text.length <= length ? text : text.substring(0, length) + '...';
        },
        getRandomColor(name) {
            const gradients = [
                'bg-gradient-to-br from-rose-400 to-red-500',
                'bg-gradient-to-br from-orange-400 to-amber-500',
                'bg-gradient-to-br from-emerald-400 to-green-600',
                'bg-gradient-to-br from-teal-400 to-cyan-600',
                'bg-gradient-to-br from-blue-400 to-indigo-600',
                'bg-gradient-to-br from-violet-400 to-purple-600',
            ];
            let hash = 0;
            for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
            return gradients[Math.abs(hash) % gradients.length];
        }
    }
};
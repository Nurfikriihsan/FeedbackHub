<template>
  <div
    class="bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col h-full min-h-[600px]">
    <div
      class="p-5 border-b border-slate-100 bg-white sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center gap-4">

      <!-- Search Bar -->
      <div class="relative w-full sm:w-96 group">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <i
            class="ph ph-magnifying-glass text-slate-400 text-lg group-focus-within:text-primary-600 transition-colors"></i>
        </div>

        <input type="text" v-model="searchQuery"
          class="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all text-sm font-medium"
          placeholder="Cari nama, email, atau isi komentar..." />
      </div>

      <!-- Stats Badge -->
      <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400">Results</div>
        <div class="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-sm font-bold border border-primary-100">
          {{ filteredComments.length }}
        </div>
      </div>
    </div>

    <div class="relative flex-1 bg-white">

      <div v-if="loading" class="p-6 space-y-6">
        <div v-for="n in 5" :key="n" class="flex items-start gap-4 animate-pulse">
          <div class="h-10 w-10 rounded-full bg-slate-100 flex-shrink-0"></div>
          <div class="flex-1 space-y-3 pt-1">
            <div class="flex justify-between">
              <div class="h-4 bg-slate-100 rounded w-1/4"></div>
              <div class="h-4 bg-slate-50 rounded w-20"></div>
            </div>
            <div class="h-3 bg-slate-50 rounded w-3/4"></div>
            <div class="h-3 bg-slate-50 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredComments.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center h-full">
        <div class="bg-slate-50 p-4 rounded-full mb-4">
          <i class="ph ph-magnifying-glass text-3xl text-slate-300"></i>
        </div>
        <h3 class="text-slate-900 font-semibold">Tidak ditemukan</h3>
        <p class="text-slate-500 text-sm mt-1">Coba kata kunci pencarian lain.</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-50">
          <thead class="bg-slate-50/80">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">User
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email</th>
              <th scope="col"
                class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-5/12">Comment
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 bg-white">
            <tr v-for="comment in paginatedComments" :key="comment.id"
              class="group hover:bg-slate-50/80 transition-colors">

              <!-- User -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      :class="['h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm', getRandomColor(comment.name)]">
                      {{ getInitials(comment.name) }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-slate-900 capitalize">{{ truncate(comment.name, 20) }}</div>
                    <div class="text-[10px] uppercase tracking-wide text-slate-400 font-bold mt-0.5">ID: #{{ comment.id
                    }}</div>
                  </div>
                </div>
              </td>

              <!-- Email -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-sm text-slate-500 font-medium">
                  <i class="ph ph-envelope-simple text-slate-400 mr-2 text-lg"></i>
                  {{ comment.email }}
                </div>
              </td>

              <!-- Body -->
              <td class="px-6 py-4">
                <p
                  class="text-sm text-slate-600 line-clamp-2 leading-relaxed group-hover:text-slate-900 transition-colors">
                  {{ comment.body }}
                </p>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="border-t border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center justify-between mt-auto">

      <div class="text-sm text-slate-500 hidden sm:block">
        Page <span class="font-bold text-slate-900">{{ page }}</span> of <span class="font-bold text-slate-900">{{
          totalPages }}</span>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto justify-between">
        <button @click="prevPage" :disabled="page === 1"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:border-primary-300 hover:text-primary-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all shadow-sm">
          <i class="ph-bold ph-caret-left"></i> Prev
        </button>

        <button @click="nextPage" :disabled="page >= totalPages"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:border-primary-300 hover:text-primary-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all shadow-sm">
          Next <i class="ph-bold ph-caret-right"></i>
        </button>

      </div>
    </div>
  </div>
</template>

<script src="../pages/comment.logic.js"></script>

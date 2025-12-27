<template>
  <div class="min-h-screen flex flex-col font-sans bg-slate-50/50">

    <!-- Top Navbar -->
    <nav class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">

          <div class="flex items-center gap-3">
            <div class="bg-primary-600 text-white p-2 rounded-lg shadow-lg shadow-primary-500/30">
              <i class="ph-fill ph-chat-teardrop-text text-xl"></i>
            </div>
            <span class="font-bold text-lg text-slate-800 tracking-tight">FeedbackHub</span>
          </div>

          <div class="flex items-center gap-4">

            <button @click="loadData" :disabled="loading"
              class="text-sm font-semibold text-slate-600 hover:text-primary-600 flex items-center gap-2 transition-colors disabled:opacity-50">
              <i class="ph-bold ph-arrows-clockwise" :class="{ 'animate-spin': loading }"></i>
              <span class="hidden sm:inline">Refresh</span>
            </button>

            <div class="h-8 w-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white shadow-md">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Admin" />
            </div>

          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <CommentTable :comments="comments" :loading="loading" />
    </main>

  </div>
</template>

<script src="./pages/app.logic.js"></script>
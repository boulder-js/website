export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer class="py-10 px-4 sm:px-6 lg:px-8 border-t border-blue-600/10">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col gap-4 text-sm text-gray-700 dark:text-gray-400 sm:flex-row sm:gap-2">
          <span>Copyright © {currentYear} BoulderJS. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

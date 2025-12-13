import { motion } from 'framer-motion'

interface VideoAnalysisResultsProps {
  transcript?: string
  hook?: {
    general?: string
    used_in_video?: string
    type?: string
  }
  scriptBase?: string
  onSave?: () => void
  isSaving?: boolean
}

const VideoAnalysisResults = ({
  transcript,
  hook,
  scriptBase,
  onSave,
  isSaving = false,
}: VideoAnalysisResultsProps) => {
  // Si no hay datos, mostrar estado vacío
  if (!transcript && !hook && !scriptBase) {
    return (
      <motion.div
        className="bg-bg-secondary/80 border border-white/5 rounded-2xl p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#FFCE45] text-2xl">
            📹
          </div>
          <p className="text-text-secondary text-sm">
            Ingresa una URL de video y haz clic en "Buscar" para ver el análisis aquí
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-bg-secondary/80 border border-white/5 rounded-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header con botón Guardar */}
      {(transcript || hook || scriptBase) && onSave && (
        <motion.div
          className="flex justify-start mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-6 py-3 text-sm rounded-lg font-medium text-[#0A0A0A] bg-[#FFCE45] hover:bg-[#E6B83D] transition-colors duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Guardando...
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="17 21 17 13 7 13 7 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="7 3 7 8 15 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Guardar Análisis
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Layout de 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna 1: Script del Video */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {transcript && (
            <section>
              <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                <span className="text-[#FFCE45]">📝</span>
                Script del Video
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-full max-h-[600px] overflow-y-auto">
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                  {transcript}
                </p>
              </div>
            </section>
          )}
        </motion.div>

        {/* Columna 2: Hook y Script Base */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Hook Section */}
          {hook && (
            <section>
              <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                <span className="text-[#FFCE45]">🎣</span>
                Hook Identificado
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
                {hook.general && (
                  <div>
                    <p className="text-xs font-medium text-text-secondary mb-2">
                      Hook General (Reutilizable)
                    </p>
                    <p className="text-text text-base font-medium bg-[#FFCE45]/10 border border-[#FFCE45]/20 rounded-lg px-4 py-3 leading-relaxed">
                      {hook.general}
                    </p>
                  </div>
                )}
                {hook.used_in_video && (
                  <div>
                    <p className="text-xs font-medium text-text-secondary mb-2">
                      Hook Usado en el Video
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {hook.used_in_video}
                    </p>
                  </div>
                )}
                {hook.type && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <span className="text-xs font-medium text-text-secondary">
                      Tipo de Hook:
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#FFCE45]/20 text-[#FFCE45] font-medium capitalize">
                      {hook.type}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Script Base Section */}
          {scriptBase && (
            <section>
              <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                <span className="text-[#FFCE45]">📋</span>
                Script Base para Replicar
              </h3>
              <div className="bg-gradient-to-br from-[#FFCE45]/10 to-[#FFCE45]/5 border border-[#FFCE45]/20 rounded-lg p-5">
                <p className="text-text text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {scriptBase}
                </p>
                <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-white/10">
                  💡 <span className="font-medium">Tip:</span> Usa este script base y personaliza los espacios en blanco (____) con tu propio contenido.
                </p>
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default VideoAnalysisResults


import { motion } from 'framer-motion'

interface VideoAnalysisResultsProps {
  transcript?: string
  hook?: {
    general?: string
    used_in_video?: string
    type?: string
  }
  scriptBase?: string
}

const VideoAnalysisResults = ({
  transcript,
  hook,
  scriptBase,
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
      className="bg-bg-secondary/80 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Transcript Section */}
      {transcript && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <span className="text-[#FFCE45]">📝</span>
            Transcripción
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
              {transcript}
            </p>
          </div>
        </motion.section>
      )}

      {/* Hook Section */}
      {hook && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <span className="text-[#FFCE45]">🎣</span>
            Hook Identificado
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
            {hook.general && (
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">
                  Hook General (Reutilizable)
                </p>
                <p className="text-text text-sm font-medium bg-[#FFCE45]/10 border border-[#FFCE45]/20 rounded px-3 py-2">
                  {hook.general}
                </p>
              </div>
            )}
            {hook.used_in_video && (
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">
                  Hook Usado en el Video
                </p>
                <p className="text-text-secondary text-sm">
                  {hook.used_in_video}
                </p>
              </div>
            )}
            {hook.type && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <span className="text-xs font-medium text-text-secondary">
                  Tipo:
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-[#FFCE45]/20 text-[#FFCE45] font-medium">
                  {hook.type}
                </span>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Script Base Section */}
      {scriptBase && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <span className="text-[#FFCE45]">📋</span>
            Script Base Replicable
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
              {scriptBase}
            </p>
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}

export default VideoAnalysisResults


import { renderToBuffer } from "@react-pdf/renderer"
import { CVDocument } from "./cv-document"

export async function GET() {
  const buffer = await renderToBuffer(<CVDocument />)

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="danny-yanko-cv.pdf"',
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}

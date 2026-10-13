# Configuración de Supabase MCP y Agent Skills en Antigravity

## 1. Configurar el Servidor MCP de Supabase

Agrega la entrada `"supabase"` a tu archivo de configuración MCP (`~/.gemini/antigravity/mcp_config.json` o `~/.gemini/config/mcp_config.json`).

### Configuración individual del servidor `supabase`:

```json
{
  "mcpServers": {
    "supabase": {
      "serverUrl": "https://mcp.supabase.com/mcp?project_ref=rydypgusgpvolggdvwyb&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching"
    }
  }
}
```

### Configuración integrada con tus MCP actuales (`code-graph`, `drawio`, `oracle-db`, `mssql-db` + `supabase`):

```json
{
  "mcpServers": {
    "code-graph": {
      "command": "npx",
      "args": [
        "-y",
        "@sdsrs/code-graph"
      ]
    },
    "drawio": {
      "command": "npx",
      "args": [
        "-y",
        "@drawio/mcp"
      ]
    },
    "oracle-db": {
      "command": "/Users/emmanuel.ponce/.gemini/config/oracle_env/bin/python",
      "args": [
        "/Users/emmanuel.ponce/.gemini/config/oracle_mcp.py"
      ]
    },
    "mssql-db": {
      "command": "/Users/emmanuel.ponce/.gemini/config/oracle_env/bin/python",
      "args": [
        "/Users/emmanuel.ponce/.gemini/config/mssql_mcp.py"
      ]
    },
    "supabase": {
      "serverUrl": "https://mcp.supabase.com/mcp?project_ref=rydypgusgpvolggdvwyb&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching"
    }
  }
}
```

### Pasos de activación y autenticación OAuth en Antigravity:
1. Guarda el archivo de configuración y **reinicia Antigravity** (se abrirá el flujo OAuth para autenticar con Supabase).
2. Para editar la configuración desde Antigravity: haz clic en el menú **`···`** en la parte superior del panel del Agente $\rightarrow$ **MCP Servers** $\rightarrow$ **Manage MCP Servers** $\rightarrow$ **View raw config**. Desde ahí también puedes hacer **Refresh** o habilitar/deshabilitar servidores.
3. Si tienes problemas de autenticación, abre **Agent Settings** con `Cmd+,` (Mac) o `Ctrl+,` (Windows/Linux), ve a la pestaña **Customizations** y haz clic en el botón **Authenticate** junto al servidor de Supabase.

---

## 2. Instalar Supabase Agent Skills (Opcional)

Las Agent Skills dotan al agente de instrucciones, scripts y recursos oficiales para trabajar con Supabase con mayor precisión y eficiencia:

```bash
npx skills add supabase/agent-skills
```

---

## 3. Referencia del Proyecto Supabase (`rydypgusgpvolggdvwyb`)

- **Project Ref**: `rydypgusgpvolggdvwyb`
- **Supabase Project URL**: `https://rydypgusgpvolggdvwyb.supabase.co`
- **Esquema SQL del CMS**: [001_cms_schema.sql](./supabase/migrations/001_cms_schema.sql)

import { CreateReportDialogButton } from '../components/CreateReportDialogButton';

export function MyReportsPage() {
  /*  const { animals, loading, error, filters, updateFilters } = useMyAnimals(); */



  /* if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg">Carregando meus animais...</div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-red-600">Erro: {error}</div>
      </div>
    );
  } */


  return (
    <div className="page-content">
      <h1>Minhas denúncias</h1>

      {/* Search + actions */}
      <form className='flex items-center justify-start gap-2'>
        <input
          type="text"
          className="input flex-1"
          placeholder="Pesquisar"
          aria-label="Pesquisar minhas denúncias"

        />

        <button type="button" className="btn">Ordenar</button>
      </form>



      <div className="sectionLabel">Minhas denúncias registradas</div>
      <CreateReportDialogButton />

      {/* List */}
      <section className="list mt-3" aria-label="Lista das minhas denúncias">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Você ainda não registrou nenhuma denúncia</p>
        </div>

      </section>
    </div>
  );
}
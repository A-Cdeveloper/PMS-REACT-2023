import { useFilterOffers } from "./useFilterOffers";
import { useOffers } from "./useOffers";
import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Data/Table";
import OfferRow from "./OfferRow";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Data/Empty";
import Error from "../../ui/Data/Error";

import { offersCols } from "./OffersParameters";

const OffersTable = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, error, offers = {} } = useFilterOffers();
  const { offers: allOffers } = useOffers();

  // console.log(offers);

  //filter results
  const filteredTextValue = searchParams.get("filterByText");

  const shownOffers = filteredTextValue
    ? allOffers.filter((offer) =>
        offer.client_name.trim().toLowerCase().includes(filteredTextValue)
      )
    : offers;

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  if (shownOffers.length === 0) return <Empty resource="offers" />;

  return (
    <>
      <Table cols={offersCols} columns="15rem 15rem 1fr 1fr 20rem 6rem 8rem">
        <Table.Header />
        <Table.Body
          data={shownOffers}
          renderItem={(offer) => (
            <OfferRow key={offer.offer_id} offer={offer} />
          )}
        />
        <Table.Footer>
          <Pagination
            count={filteredTextValue ? shownOffers.length : allOffers.length}
            filter={!!filteredTextValue}
            resource="offers_per_page"
          />
        </Table.Footer>
      </Table>
    </>
  );
};

export default OffersTable;

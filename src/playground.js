{
  /* <div className="nftsaledetails__subcontainer">
  <div className="nftimg__left-container">
    <div className="nft__image--wrapper">
      <img src={metadata?.offChainData?.image} alt="" className="nft__image" />
    </div>
  </div>
  <div className="nftresult__right-container">
    <h3 className="nftresult__heading">
      Sale Amount: {data?.events.nft.amount}
    </h3>
    <h3 className="nftresult__heading">Seller: {data?.events.nft.seller}</h3>
    <h3 className="nftresult__heading">Buyer: {data?.events.nft.buyer}</h3>
    <h3 className="nftresult__heading">
      Marketplace Sold On: {data?.events.nft.source}
    </h3>
    <h3 className="nftresult__heading">
      Mint Address: {data?.events.nft.nfts[0].mint}
    </h3>
    <h3 className="nftresult__heading">
      Royalty Fee:
      {metadata?.onChainData?.data.sellerFeeBasisPoints / 100} %
    </h3>
    {metadata && (
      <h3 className="nftresult__heading">
        {creators
          .filter((creator) => creator.share > 0)
          .map((creator) => {
            const royaltyPayment = nativeTrf.find(
              (trf) => trf.toUserAccount === creator.address
            );
            let content;
            let content2;
            if (royaltyPayment) {
              content = `${royaltyPayment.amount} was paid to ${creator.address}`;
              content2 = `Royalty Paid: Yes`;
            } else {
              content = `Royalties was not paid to ${creator.address}`;
              content2 = `Royalty Paid: No`;
            }
            return (
              <p key={creator.address}>
                {content} {content2}
              </p>
            );
          })}
      </h3>
    )}
  </div>
</div>;

//Example on how to map data

return (
  <section id="section-popular" className="pb-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-12" data-aos="fade-in" data-aos-once="true">
          <div className="text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>
        {loading ? null : (
          <div className="col-md-12" data-aos="fade-in" data-aos-once="true">
            <ol className="author_list">
              {topSellersData?.map((topSellerData, id) => (
                <TopSeller
                  topSellersData={topSellerData}
                  loading={loading}
                  key={id}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  </section>
); */
}

console.log("hi");
